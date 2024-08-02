export const environment = {
    
    production: true,
    //baseUrl: "https://connectapi-staging.highnoon.com.pk/api/",
    //imageBaseUrl: "https://connectapi-staging.highnoon.com.pk/",
    baseUrl: "https://quality_engageui.enteract.app/api/",
    baseUrlAI: "http://52.77.162.250:5005/",
    imageBaseUrl: "https://hnbackend.enteract.app:8445",
    visitorUrl: "LogsHub",
    chatBotBaseUrl: 'https://engage-rag.enteract.live/',
    conversationBotBaseUrl: "https://engage-rag.enteract.live/",
    link:{
      analytics:{
        getTotalBotConversation:'analytics/total_bot_conversations?bot_id=1&filter_days=7',
        getTotalAgents:'analytics/total_bots_agent?bot_id=1',
        avgBotConversationTime:'analytics/avg_bot_conversation_time?bot_id=1&filter_days=7',
        botEsclationRate:'analytics/bot_escalation_rate?bot_id=1&filter_days=7',
        avgWaitTime:'analytics/avg_wait_time?bot_id=1&filter_days=7',
        sentimentAnalysis:'analytics/sentiments_analysis_bot_csat?bot_id=1&filter_days=7',
        tagsAnalatics:'analytics/tags_analytics?bot_id=1&filter_days=7',
        peakHours:'analytics/peak_hours?bot_id=1',
        totalToken:'analytics/total_tokens?bot_id=1&filter_days=7',
        conversationOverTime:'analytics/conversations_over_time',
        avgToken:'analytics/average_tokens_per_conversation?bot_id=1&filter_days=7',
        timeoutCount:'analytics/session_time_out?bot_id=1&filter_days=7',
        tokenPerDay:'analytics/tokens_per_day?bot_id=1',


        fallBackCount:'escalatecount',
      }
    },
    bot_id:"1",
    workspace_id:"1",
    superTeam:"1001",
    superTeam1:"1001",
    appKey:"eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoibXVoYW1tYWQucml4dmFuLndhaGVlZEBnbWFpbC5jb20iLCJleHAiOjE2NzYyMzA4MjYsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjQ0MzY5LyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjQyMDAifQ.NlSFdJSUQfDF0_hbXkfL_smZkfV8b9KFt4ToBFZDzO0",
    

  };
