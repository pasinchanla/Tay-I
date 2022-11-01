import { pipeline } from 'stream/promises'

export default async function handler(req, res) {
    const lyrics = req.query.lyrics
    console.log(req)

    res.setHeader('Content-disposition', 'attachment; filename=lyric.txt')
    res.status(200)
    await pipeline(lyrics, res)
}
