export default {
  async fetch(request) {
    const url = new URL(request.url);

    // FOLDER API
    if (url.pathname === "/folder") {
      const course_id = url.searchParams.get("course_id");
      const parent_id = url.searchParams.get("parent_id");

      if (!course_id || !parent_id) {
        return Response.json({
          success: false,
          message: "course_id and parent_id required"
        });
      }

      const api =
        `https://pdablu-yourl.wasmer.app/?action=folder&course_id=${course_id}&parent_id=${parent_id}`;

      const response = await fetch(api, {
        headers: {
          "User-Agent": "Mozilla/5.0"
        }
      });

      const data = await response.text();

      return new Response(data, {
        headers: {
          "content-type": "application/json",
          "access-control-allow-origin": "*"
        }
      });
    }

    // VIDEO API
    if (url.pathname === "/video") {
      const course_id = url.searchParams.get("course_id");
      const video_id = url.searchParams.get("video_id");

      if (!course_id || !video_id) {
        return Response.json({
          success: false,
          message: "course_id and video_id required"
        });
      }

      const api =
        `https://pdablu-yourl.wasmer.app/?action=video&video_id=${video_id}&course_id=${course_id}`;

      const response = await fetch(api, {
        headers: {
          "User-Agent": "Mozilla/5.0"
        }
      });

      const data = await response.text();

      return new Response(data, {
        headers: {
          "content-type": "application/json",
          "access-control-allow-origin": "*"
        }
      });
    }

    return new Response("Invalid endpoint");
  }
}
