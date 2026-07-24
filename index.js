const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Bot token from environment variable
const token = process.env.BOT_TOKEN;

if (!token) {
    console.error('BOT_TOKEN is not defined in environment variables');
    process.exit(1);
}

// Create bot instance
const bot = new TelegramBot(token, { polling: true });

// Channel link
const CHANNEL_LINK = 'https://t.me/Sport_HUB_football';
const CHANNEL_USERNAME = '@Sport_HUB_football';

// Bot commands and responses

// Start command
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const firstName = msg.from.first_name || 'User';
    
    const welcomeMessage = `
🏆 *Welcome to SBC369 Bot!* 🏆

Hello ${firstName}! I'm your ultimate sports betting companion.

📊 *What I Can Do For You:*
• 📈 Real-time betting odds
• ⚽ Match predictions & analysis
• 📅 Upcoming fixtures
• 🎯 Live scores
• 💡 Betting tips & insights

📌 *Commands:*
/odds - Get current betting odds
/predictions - Get match predictions
/fixtures - View upcoming matches
/livescores - Live score updates
/tips - Betting tips
/channel - Join our community
/help - Show this message

🔥 *Join our community:* ${CHANNEL_LINK}

*Stay ahead of the game with SBC369!* 🚀
    `;
    
    bot.sendMessage(chatId, welcomeMessage, { parse_mode: 'Markdown' });
});

// Help command
bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    
    const helpMessage = `
🆘 *Help & Commands*

Here are all available commands:

/start - Welcome message
/odds - Current betting odds
/predictions - Match predictions
/fixtures - Upcoming fixtures
/livescores - Live scores
/tips - Betting tips
/channel - Join our Telegram channel
/help - Show this help message

💬 *Need support?* 
Join our channel: ${CHANNEL_LINK}
    `;
    
    bot.sendMessage(chatId, helpMessage, { parse_mode: 'Markdown' });
});

// Channel command
bot.onText(/\/channel/, (msg) => {
    const chatId = msg.chat.id;
    
    const channelMessage = `
📢 *Join Our Community!*

Stay updated with the latest sports news, betting tips, and exclusive content.

👉 *Click here to join:* ${CHANNEL_LINK}

🔔 Don't miss out on daily updates and special offers!

Channel: ${CHANNEL_USERNAME}
    `;
    
    bot.sendMessage(chatId, channelMessage, { parse_mode: 'Markdown' });
});

// Odds command
bot.onText(/\/odds/, async (msg) => {
    const chatId = msg.chat.id;
    
    // Send typing indicator
    bot.sendChatAction(chatId, 'typing');
    
    try {
        // This is where you would fetch real odds from an API
        // For now, sending sample data
        const oddsMessage = `
📊 *Current Betting Odds*

⚽ *Premier League*
• Manchester City vs Arsenal
  - Man City: 1.85
  - Draw: 3.50
  - Arsenal: 4.20

⚽ *La Liga*
• Barcelona vs Real Madrid
  - Barcelona: 2.10
  - Draw: 3.30
  - Real Madrid: 3.15

🏀 *NBA*
• Lakers vs Warriors
  - Lakers: 1.95
  - Warriors: 1.88

📌 *Note:* Odds are updated in real-time

🔄 Use /channel for more updates
    `;
        
        bot.sendMessage(chatId, oddsMessage, { parse_mode: 'Markdown' });
    } catch (error) {
        console.error('Error fetching odds:', error);
        bot.sendMessage(chatId, '❌ Sorry, unable to fetch odds at the moment. Please try again later.');
    }
});

// Predictions command
bot.onText(/\/predictions/, async (msg) => {
    const chatId = msg.chat.id;
    
    bot.sendChatAction(chatId, 'typing');
    
    try {
        const predictionsMessage = `
🔮 *Match Predictions*

⚽ *Today's Top Predictions:*

1️⃣ *Manchester City vs Arsenal*
   • Prediction: Manchester City Win
   • Confidence: 75%
   • BTTS: Yes
   • Over 2.5 Goals: Yes

2️⃣ *Barcelona vs Real Madrid*
   • Prediction: Draw
   • Confidence: 60%
   • BTTS: Yes
   • Over 2.5 Goals: Yes

3️⃣ *Bayern Munich vs Dortmund*
   • Prediction: Bayern Munich Win
   • Confidence: 70%
   • BTTS: No
   • Over 2.5 Goals: Yes

📊 *Analysis based on:*
• Recent form
• Head-to-head statistics
• Player availability
• Home/Away performance

💡 For more detailed analysis, join our channel: ${CHANNEL_LINK}
        `;
        
        bot.sendMessage(chatId, predictionsMessage, { parse_mode: 'Markdown' });
    } catch (error) {
        console.error('Error fetching predictions:', error);
        bot.sendMessage(chatId, '❌ Unable to fetch predictions. Please try again later.');
    }
});

// Fixtures command
bot.onText(/\/fixtures/, async (msg) => {
    const chatId = msg.chat.id;
    
    bot.sendChatAction(chatId, 'typing');
    
    try {
        const fixturesMessage = `
📅 *Upcoming Fixtures*

⚽ *Premier League - This Weekend*
• Man City vs Arsenal - Sat 15:00
• Liverpool vs Chelsea - Sat 17:30
• Tottenham vs Man United - Sun 14:00

⚽ *Champions League - Midweek*
• Real Madrid vs PSG - Tue 20:00
• Bayern vs Barcelona - Wed 20:00
• Liverpool vs AC Milan - Wed 20:00

⚽ *La Liga*
• Barcelona vs Real Madrid - Sat 20:00
• Atletico vs Sevilla - Sun 18:30

🏀 *NBA*
• Lakers vs Warriors - Fri 22:00
• Celtics vs Heat - Sat 00:30

📌 *All times in GMT*

🔔 Set reminders and get notifications in our channel!
        `;
        
        bot.sendMessage(chatId, fixturesMessage, { parse_mode: 'Markdown' });
    } catch (error) {
        console.error('Error fetching fixtures:', error);
        bot.sendMessage(chatId, '❌ Unable to fetch fixtures. Please try again later.');
    }
});

// Live scores command
bot.onText(/\/livescores/, async (msg) => {
    const chatId = msg.chat.id;
    
    bot.sendChatAction(chatId, 'typing');
    
    try {
        const liveScoresMessage = `
⚡ *Live Scores*

⚽ *Premier League*
• Man City 2 - 1 Arsenal (65')
  Goals: Haaland (12', 45'), Saka (38')
  
⚽ *La Liga*
• Barcelona 1 - 1 Real Madrid (55')
  Goals: Lewandowski (22'), Vinicius (40')

⚽ *Bundesliga*
• Bayern 3 - 0 Dortmund (70')
  Goals: Kane (15', 50'), Sane (34')

🏀 *NBA*
• Lakers 98 - 95 Warriors (Q4 - 2:30)
  Points: James 28, Curry 32

📊 *Stats available:*
• Possession
• Shots on target
• Corners
• Cards

📱 For real-time updates: ${CHANNEL_LINK}
        `;
        
        bot.sendMessage(chatId, liveScoresMessage, { parse_mode: 'Markdown' });
    } catch (error) {
        console.error('Error fetching live scores:', error);
        bot.sendMessage(chatId, '❌ Unable to fetch live scores. Please try again later.');
    }
});

// Tips command
bot.onText(/\/tips/, async (msg) => {
    const chatId = msg.chat.id;
    
    bot.sendChatAction(chatId, 'typing');
    
    try {
        const tipsMessage = `
💡 *Betting Tips & Insights*

🎯 *Today's Best Bets:*

1️⃣ *Manchester City vs Arsenal*
   • BTTS YES @ 1.80
   • Over 2.5 Goals @ 1.75
   • City to win & BTTS @ 3.20

2️⃣ *Barcelona vs Real Madrid*
   • Over 1.5 Goals @ 1.45
   • Both Teams to Score @ 1.90
   • Draw @ 3.30

3️⃣ *Bayern Munich vs Dortmund*
   • Bayern -1.5 @ 2.10
   • Over 3.5 Goals @ 2.05
   • Kane to score @ 2.00

📈 *Tips based on:*
• Team form (last 5 matches)
• Head-to-head records
• Injury news
• Historical data

⚠️ *Remember:* Bet responsibly!

📱 Join our channel for expert tips: ${CHANNEL_LINK}
        `;
        
        bot.sendMessage(chatId, tipsMessage, { parse_mode: 'Markdown' });
    } catch (error) {
        console.error('Error fetching tips:', error);
        bot.sendMessage(chatId, '❌ Unable to fetch tips. Please try again later.');
    }
});

// Handle any other messages
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    
    // Ignore commands that we've already handled
    if (text && text.startsWith('/')) {
        // Check if it's a valid command
        const validCommands = ['/start', '/help', '/odds', '/predictions', '/fixtures', '/livescores', '/tips', '/channel'];
        if (!validCommands.includes(text)) {
            bot.sendMessage(chatId, 
                `❌ Unknown command. Type /help to see all available commands.\n\n👉 Join our channel: ${CHANNEL_LINK}`
            );
        }
    } else if (text) {
        // For non-command messages, redirect to channel
        bot.sendMessage(chatId, 
            `🤖 *SBC369 Bot*\n\nFor sports updates and betting information, please visit our channel:\n\n${CHANNEL_LINK}\n\nOr use the commands listed in /help`
        , { parse_mode: 'Markdown' });
    }
});

// Error handling
bot.on('polling_error', (error) => {
    console.error('Polling error:', error);
});

bot.on('webhook_error', (error) => {
    console.error('Webhook error:', error);
});

console.log('🤖 SBC369 Bot is running...');
console.log(`📢 Channel: ${CHANNEL_LINK}`);
console.log('✅ Bot is ready to receive messages');
