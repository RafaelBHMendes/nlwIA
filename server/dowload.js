import ytdl from "ytdl-core"
import fs from "fs"

export const dowload = (videoId) => {
  const videoURL = "https://www.youtube.com/shorts/" + videoId

  console.log(videoId)

  ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly" })
    .on("info", (info) => {
      const seconds = info.formats[0].approxDurationMs / 1000

      if (seconds > 90) {
        throw new Error("This video is too long.")
      }
    })
    .on("end", () => {
      console.log("video finished")
    })
    .on("error", (error) => {
      console.log("download error: " + error)
    })
    .pipe(fs.createWriteStream("./tmp/audio.mp4"))
}
