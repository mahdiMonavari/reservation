export async function POST(req) {
  try {
    const commentBody = await req.json();
    const { doctorId, userId, text } = commentBody;
  } catch (err) {}
}
