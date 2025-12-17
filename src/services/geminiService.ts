import { Message, Sender, GradeLevel, Subject, Attachment } from "../types"; 
import { getCurriculumStringForAI } from "../data/curriculum";

const SYSTEM_INSTRUCTION = `
أنت نظام تعليم ذكي متخصص لطلاب الثانوية العامة المصرية (الصفوف: الأول، الثاني، والثالث).

**فلسفة العمل**: "خير الكلام ما قل ودل".
مهمتك هي تقديم المعلومات الدراسية بشكل **مختصر جداً، مركز، ومنظم**.

**التعليمات الصارمة**:
1. **الاختصار**: تجنب الشرح المطول والسرد الإنشائي.
2. **العناصر**: اعتمد على القوائم النقطية (Bullet Points).
3. **المباشرة**: أجب فوراً بدون مقدمات.

**عرض البيانات**:
- يمنع توليد JSON أو Charts.
- استخدم الجداول (Markdown) فقط.

**سياق الطالب**:
- الصف: [GRADE_LEVEL]
- المادة: [SUBJECT]

[CURRICULUM_LIST]
`;

export interface GenerationOptions {
  useThinking?: boolean;
  useSearch?: boolean;
}

/* ===============================
   Generate Text (NO STREAMING)
   =============================== */
export const generateStreamResponse = async (
  userMessage: string,
  grade: GradeLevel,
  subject: Subject,
  history: Message[],
  onChunk: (text: string) => void,
  attachment?: Attachment,
  options?: GenerationOptions
): Promise<string> => {

  const curriculumString = getCurriculumStringForAI(grade, subject);

  const dynamicInstruction = SYSTEM_INSTRUCTION
    .replace('[GRADE_LEVEL]', grade)
    .replace('[SUBJECT]', subject)
    .replace('[CURRICULUM_LIST]', curriculumString);

  try {
    const response = await fetch("/api/gemini", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        systemInstruction: dynamicInstruction,
        userMessage,
        grade,
        subject,
        history,
        attachment,
        options,
      }),
    });

    if (!response.ok) {
      throw new Error("Gemini backend error");
    }

    const data = await response.json();

    const text =
      data?.candidates?.[0]?.content?.parts
        ?.map((p: any) => p.text)
        ?.join("") || "لا يوجد رد";

    onChunk(text);
    return text;

  } catch (error) {
    console.error("Gemini Proxy Error:", error);
    const msg = "⚠️ الخدمة مشغولة حالياً، حاول مرة أخرى بعد قليل.";
    onChunk(msg);
    return msg;
  }
};

/* ===============================
   Speech Disabled Temporarily
   =============================== */

export const generateSpeech = async (): Promise<null> => {
  return null;
};

export const streamSpeech = async (): Promise<void> => {
  return;
};

