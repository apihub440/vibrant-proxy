export default {
  async fetch(request) {

    const url = new URL(request.url)

    // Home
    if (url.pathname === "/") {
      return Response.json({
        success: true,
        message: "Vibrant Proxy Running"
      })
    }

    // Folder API
    if (url.pathname === "/folder") {

      const course_id = url.searchParams.get("course_id")
      const parent_id = url.searchParams.get("parent_id")
      const start = url.searchParams.get("start") || "0"

      if (!course_id || !parent_id) {
        return Response.json({
          success: false,
          message: "course_id and parent_id required"
        })
      }

      try {

        const api =
          `https://pdablu-yourl.wasmer.app/?action=folder&course_id=${course_id}&parent_id=${parent_id}&start=${start}`

        const response = await fetch(api, {
          headers: {
            "User-Agent": "Mozilla/5.0",
            "Accept": "application/json",
            "Referer": "https://eduvibe-vibrant.pages.dev/"
          }
        })

        const text = await response.text()

        return new Response(text, {
          status: 200,
          headers: {
            "content-type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        })

      } catch (err) {

        return Response.json({
          success: false,
          error: err.toString()
        }, {
          status: 500
        })

      }

    }

    return new Response("Not Found", {
      status: 404
    })
  }
}
