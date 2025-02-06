const { fetchProgrammingExerciseDetails } = require("../../services/moocfi") // Import API call
const { GraphQLList, GraphQLObjectType, GraphQLString } = require("gatsby/graphql")

const quizRegex = /<\s*quiz\s*id\s*=\s*['"]\s*([\w-]+)\s*['"]\s*>/gm
const crowdsorcererRegex = /<\s*crowdsorcerer\s*id\s*=\s*['"]\s*(\w+)\s*['"].*>/gm
const programmingExerciseTagRegex = /<\s*programming-exercise\s+(.*)\s*>/gm
const inBrowserProgrammingExerciseTagRegex = /<\s*in-browser-programming-exercise\s+(.*)\s*>/gm
const programmingExerciseNameRegex = /\bname\s*=\s*(["].*?["]|['].*?['])/gm
const moodleRegex = /<\s*moodle-exercise\s*name\s*=\s*['"]\s*(.*)\s*['"]\s*>/gm
const sqlTrainerRegex = /<\s*sqltrainer-exercise\s*name\s*=\s*['"]\s*(.*)\s*['"]\s*>/gm
const commentRegex = /<!--.*?-->/mgs

function getMatches(string, regex, index = 1) {
  let matches = []
  let match
  while ((match = regex.exec(string))) {
    matches.push({ match: match[index], location: match.index })
  }
  return matches
}

const ExerciseType = new GraphQLObjectType({
  name: `Exercise`,
  fields: {
    id: { type: GraphQLString },
    type: { type: GraphQLString },
    parentPagePath: { type: GraphQLString },
  },
})

exports.setFieldsOnGraphQLNodeType = ({ type }) => {
  if (type.name === `MarkdownRemark`) {
    return {
      moocfiExercises: {
        type: GraphQLList(ExerciseType),
        resolve: async (node, _fieldArgs) => {
          // Remove comments from Markdown content
          const source = (node.rawMarkdownBody || "").replace(commentRegex, "")

          const programmingExercises = await Promise.all(
            getMatches(source, programmingExerciseTagRegex, 1).map(async (res) => {
              let id = "unknown"
              try {
                const match = getMatches(res.match, programmingExerciseNameRegex, 1)[0].match
                id = match.substring(1, match.length - 1) // Fix substring extraction
              } catch (e) {
                console.error(`Error extracting exercise name: ${e}`)
              }

              //  Fetch Exercise Details
              let exerciseDetails = {}
              try {
                exerciseDetails = await fetchProgrammingExerciseDetails(id)
              } catch (err) {
                console.error(`Error fetching exercise details for ${id}:`, err)
              }

              // Skip disabled exercises
              if (exerciseDetails?.disabled) {
                console.log(`Skipping disabled exercise: ${id}`)
                return null
              }

              return {
                id,
                location: res.location,
                type: "programming-exercise",
                parentPagePath: node.frontmatter.path,
              }
            })
          )

          //  Remove null values (disabled exercises)
          return programmingExercises.filter(Boolean)
        },
      },
    }
  }

  return {}
}


  // by default return empty object
  return {}
}
