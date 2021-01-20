import { fetchProgrammingProgress, getCachedUserDetails } from "./moocfi"
import { zip } from "../util/arrays"
import { fetchQuizProgress } from "./quiznator"
import { fetchQuizzesProgress } from "./quizzes"

const introductionCourseGroups = [
  "osa01",
  "osa02",
  "osa03",
  "osa04",
  "osa05",
  "osa06",
  "osa07",
]

export async function fetchProgress(t) {
  // await fetchQuizzesProgress()
  const serviceIdentifiers = [t("programmingService"), t("quizService")]
  const progressesCollection = await Promise.all([
    fetchProgrammingProgress(),
    fetchQuizzesProgress(),
  ])
  const userDetails = await getCachedUserDetails()
  const currentCourseVariant = userDetails?.extra_fields?.course_variant
  const progressByGroup = {}

  zip(serviceIdentifiers, progressesCollection).forEach(
    ([identifier, progresses]) => {
      console.log(JSON.stringify(progresses))
      progresses.forEach((progressEntry) => {
        if (!progressByGroup[progressEntry.group]) {
          progressByGroup[progressEntry.group] = {}
        }
        progressByGroup[progressEntry.group][identifier] = progressEntry
      })
    },
  )
  const toBeDeleted = []
  toBeDeleted.push("osa3")
  toBeDeleted.push("osa4")
  toBeDeleted.push("osa5")
  toBeDeleted.push("osa6")
  toBeDeleted.push("osa7")
  toBeDeleted.push("osa8")
  toBeDeleted.push("osa9")
  toBeDeleted.push("osa10")
  toBeDeleted.push("osa11")
  toBeDeleted.push("osa12")
  toBeDeleted.push("osa13")
  toBeDeleted.push("osa14")
  Object.entries(progressByGroup).forEach(([group, serviceEntries]) => {
    if (
      !Object.keys(serviceEntries).find((o) => o === t("programmingService"))
    ) {
      toBeDeleted.push(group)
    }
  })
  // TODO: this is not a good way to do this
  toBeDeleted.forEach((o) => {
    delete progressByGroup[o]
  })
  return progressByGroup
}
