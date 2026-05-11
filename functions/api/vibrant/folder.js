export async function onRequest(context) {
  const url = new URL(context.request.url);

  const course_id = url.searchParams.get("course_id");
  const parent_id = url.searchParams.get("parent_id");

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

  return Response.json(data);
}
