const apiKey = "sk-e657c7041bdf4be2b7d17605aea0548c";

async function sendMessage() {
  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");
  const userMessage = input.value.trim();

  if (!userMessage) return;

  chatBox.innerHTML += `<div><strong>شما:</strong> ${userMessage}</div>`;
  input.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + apiKey,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userMessage }]
    })
  });

  const data = await response.json();
  const botReply = data.choices?.[0]?.message?.content || "خطا در دریافت پاسخ";
  chatBox.innerHTML += `<div><strong>چت‌بات:</strong> ${botReply}</div>`;
  chatBox.scrollTop = chatBox.scrollHeight;
}
