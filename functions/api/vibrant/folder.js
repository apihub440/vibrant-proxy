export default {
  async fetch(request) {
    const url = new URL(request.url);

    const course_id = url.searchParams.get("course_id");
    const parent_id = url.searchParams.get("parent_id");

    if (!course_id || !parent_id) {
      return Response.json({
        success: false,
        message: "course_id and parent_id required"
      });
    }

    const api =
      `https://vibrantacademykotaapi.akamai.net.in/get/parent_folder_contents?course_id=${course_id}&current_folder_id=${parent_id}`;

    const response = await fetch(api, {
      headers: {
        "Client-Service": "Appx",
        "Auth-Key": "appxapi",
        "source": "website",
        "user_app_category": "2",
        "User-Agent": "Mozilla/5.0"
      }
    });

    const data = await response.json();

    return Response.json(data, {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
}
