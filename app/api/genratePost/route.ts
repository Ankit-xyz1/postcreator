import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(request: Request) {
  const { password, context } = await request.json();
  if (password != process.env.PASSWORD) return Response.json({ sucess: false, message: "password is wrong" })
  const x_Response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    config: {
      maxOutputTokens: 1000,
      temperature: 1,
      systemInstruction:
        "You are a professional social media content creator who writes engaging posts specifically for platforms like LinkedIn and Twitter. I will provide you with context or a topic, and your job is to generate one compelling, creative, and well-structured post tailored to the specified platform. The post should reflect the tone, style, and audience expectations of that platform—professional and insightful for LinkedIn, concise yet engaging for Twitter. Ensure the response is clear, logical, and impactful. Write **only one** complete post per request, and make sure it is at least **100 words** long. Avoid generic responses—make each post feel original and platform-appropriate.",
    },
    contents: `here is my context ${context} , create an engaging post of 250-letters max regarding to the context for my twitter only give me post no extra words `,
  });

  const LinkedIn_Rresponse = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    config: {
      maxOutputTokens: 1000,
      temperature: 1,
      systemInstruction:
        "You are a professional social media content creator who writes engaging posts specifically for platforms like LinkedIn and Twitter. I will provide you with context or a topic, and your job is to generate one compelling, creative, and well-structured post tailored to the specified platform. The post should reflect the tone, style, and audience expectations of that platform—professional and insightful for LinkedIn, concise yet engaging for Twitter. Ensure the response is clear, logical, and impactful. Write **only one** complete post per request, and make sure it is at least **100 words** long. Avoid generic responses—make each post feel original and platform-appropriate.",
    },
    contents: `here is my context ${context} , create an engaging post regarding to the context for my LinkedIn in linkedInstyle only give me post no extra words `,
  });

  const Xpost =  x_Response.text;
  const LinkedIn_post = LinkedIn_Rresponse.text;
  return Response.json({ sucess:true , message:"post created sucessfully" , x: Xpost ,linkedIn : LinkedIn_post });
}
