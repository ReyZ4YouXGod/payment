export default async function handler(req, res) {
  // 1. Langsung kasih respon ke Pakasir biar akun lo AMAN (Anti-Suspen)
  res.status(200).json({ status: 'received' });

  // 2. Cek apakah ini data beneran dari Pakasir (Metode POST)
  if (req.method === 'POST') {
    try {
      const data = req.body;

      // --- CONFIGURATION ---
      const BOT_TOKEN = '7805124868:AAFZtImH0qfvyddaX2ba4NwXEPy55k6n04I';
      const CHAT_ID = '2027479396';
      // ---------------------

      // Ambil data dari Pakasir
      const nominal = data.amount || data.nominal || '0';
      const status = data.status || 'Success';
      const ref = data.reference || data.reff || '-';
      const payment_method = data.payment_method || 'QRIS';

      // Format Pesan untuk Telegram
      const pesan = `💸 *DUIT MASUK, COK!* 💸\n\n` +
                    `💰 *Nominal:* Rp${nominal}\n` +
                    `🆔 *Ref:* ${ref}\n` +
                    `💳 *Via:* ${payment_method}\n` +
                    `✅ *Status:* ${status}\n` +
                    `📅 *Waktu:* ${new Date().toLocaleString('id-ID')}`;

      // 3. Kirim ke Telegram
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: pesan,
          parse_mode: 'Markdown'
        })
      });

    } catch (error) {
      console.error('Bot Error: ', error);
    }
  }
}
