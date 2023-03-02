const { Configuration, OpenAIApi } = require("openai");

module.exports = (app, router) => {
  router.get("/api-chatgpt-integrate/listModels", async (ctx) => {
    const token = ctx.request.header.token || ctx.query.token;
    if (!token) {
      ctx.status = 401;
      return;
    }
    const configuration = new Configuration({
      organization: "org-6FjoQOPZjgVoVlVZ0BRHdPMe",
      apiKey: token,
    });

    const openai = new OpenAIApi(configuration);
    const response = await openai.listModels();
    ctx.status = response.status;
    ctx.response.body = response.data;
  });

  router.get("/api-chatgpt-integrate/completion", async (ctx) => {
    const token = ctx.request.header.token || ctx.query.token;
    if (!token) {
      ctx.status = 401;
      return;
    }
    const configuration = new Configuration({
      organization: "org-6FjoQOPZjgVoVlVZ0BRHdPMe",
      apiKey: token,
    });

    const openai = new OpenAIApi(configuration);
    console.log("openai config ok");
    try {
      const response = await openai.createCompletion(
        {
          model: ctx.query.model || "text-davinci-003",
          prompt: ctx.query.prompt,
          temperature: ctx.query.temperature || 0,
          max_tokens: 2048,
          top_p: 1,
          stop: "\n",
          stream: true,
        },
        { responseType: "stream" }
      );
      ctx.set({
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      });
      ctx.status = 200;
      ctx.body = response.data;
    } catch (error) {
      console.log(error.message);
    }
  });
};
