export const environment = {
    
    production: true,
    //baseUrl: "https://connectapi-staging.highnoon.com.pk/api/",
    //imageBaseUrl: "https://connectapi-staging.highnoon.com.pk/",
    baseUrl: "https://quality_engageui.enteract.app/api/",
    baseUrlAI: "http://52.77.162.250:5005/",
    imageBaseUrl: "https://hnbackend.enteract.app:8445",
    visitorUrl: "LogsHub",
    chatBotBaseUrl: 'https://ai-bot.enteract.app/',
    conversationBotBaseUrl: "https://ai-bot.enteract.app/",
    link:{
      analytics:{
        getTotalBotConversation:`analytics/total_bot_conversations`,
        getTotalAgents:'analytics/total_bots_agent?bot_id=1',
        avgBotConversationTime:`analytics/avg_bot_conversation_time`,
        botEsclationRate:`analytics/bot_escalation_rate`,
        avgWaitTime:`analytics/avg_wait_time`,
        sentimentAnalysis:`analytics/sentiments_analysis_bot_csat`,
        humanAgentCsat:'analytics/sentiments_analysis_agent_csat',
        tagsAnalatics:`analytics/tags_analytics`,
        peakHours:'analytics/peak_hours?bot_id=1',
        totalToken:`analytics/total_tokens`,
        conversationOverTime:'analytics/conversations_over_time',
        avgToken:`analytics/average_tokens_per_conversation`,
        timeoutCount:`analytics/session_time_out`,
        tokenPerDay:'analytics/tokens_per_day?bot_id=1',
        humanTransferRate:"analytics/human_transfer_rate",
        averageTokenPerChat:"analytics/average_token_per_chat",
        totalBotSessionsOvertime:"analytics/total_bot_sessions_over_time",

        fallBackCount:'escalatecount',
      }
    },
    bot_id:"1",
    workspace_id:"1",
    superTeam:"1001",
    superTeam1:"1001",
    appKey:"eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoibXVoYW1tYWQucml4dmFuLndhaGVlZEBnbWFpbC5jb20iLCJleHAiOjE2NzYyMzA4MjYsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjQ0MzY5LyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjQyMDAifQ.NlSFdJSUQfDF0_hbXkfL_smZkfV8b9KFt4ToBFZDzO0",
    

  };
