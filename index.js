export default {
  async fetch(request) {
    const url = new URL(request.url)

    // Home route
    if (url.pathname === "/") {
      return Response.json({
        success: true,
        message: "Vibrant Proxy Working"
      })
    }

    // Folder API
    if (url.pathname === "/folder") {

      const course_id = url.searchParams.get("course_id")
      const parent_id = url.searchParams.get("parent_id")
      const start = url.searchParams.get("start") || "0"

      const api =
        `https://pdablu-yourl.wasmer.app/?action=folder&course_id=${course_id}&parent_id=${parent_id}&start=${start}`

      const response = await fetch(api, {
        headers: {
          "User-Agent": "Mozilla/5.0",
          "Referer": "https://eduvibe-vibrant.pages.dev/"
        }
      })

      const data = await response.json()

      return Response.json(data)
    }

    return new Response("Not Found", { status: 404 })
  }
}
