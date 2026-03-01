export default async function handler(req, res) {
  // 1. Kasih jawaban ke Pakasir duluan biar akun lo Aman (Anti-Suspen)
  // Sistem Pakasir butuh respon 200 OK cepet-cepet.
  res.status(200).json({ status: 'received' });

  // 2. Cek kalau ini beneran data masuk (POST)
  if (req.method === 'POST') {
    const data = req.body;

    // Setting Bot Tele lo
    const BOT_TOKEN = '7805124868:AAFZtImH0qfvyddaX2ba4NwXEPy55k6n04I';
    const CHAT_ID = '2027479396';

    // Ambil data penting dari Pakasir (Sesuaikan variabelnya)
    const nominal = data.amount || data.nominal || '0';
    const status = data.status || 'Success';
    const ref = data.reference || data.reff || '-';

    // Format Pesan
    const pesan = `💸 *DUIT MASUK, COK!* 💸\n\n` +
                  `💰 *Nominal:* Rp${nominal}\n` +
                  `🆔 *Ref:* ${ref}\n` +
                  `✅ *Status:* ${status}\n` +
                  `📅 *Waktu:* ${new Date().toLocaleString('id-ID')}`;

    // 3. Kirim ke Telegram lewat jalur belakang
    try {
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: pesan,
          parse_mode: 'Markdown'
        })
      });
    } catch (e) {
      console.log('Gagal kirim tele, tapi Pakasir udah dapet respon OK.');
    }
  }
}
