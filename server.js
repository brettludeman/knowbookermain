const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Hotel sentences stored securely on backend
const hotelSentences = [
  "★ Guests wearing flip-flops or swimsuits may be asked to return in proper shoes, but otherwise the dress code is casual.",
  "★ There's a large mirror-lined stretch zone at the back of the gym, with two foam rollers, a Swiss ball, and yoga blocks.",
  "★ Each bedside table includes a lamp, wireless charging pad, digital clock, notepad, and pen.",
  "★ Light switches are small, metal, and click smoothly.",
  "★ The wardrobe lights up when opened.",
  "★ Signs are clearly marked.",
  "★ Guests looking for a quieter place to relax are encouraged to use the library lounge on level two.",
  "★ The head chef, Lena, is known for experimenting with weekend specials—like tempura zucchini flowers or beetroot risotto—and often comes out to chat with regular guests.",
  "★ A small motion-sensor night light turns on softly if you get up during the night.",
  "★ It holds a robe, three sizes of slippers, hangers, an ironing board, and a small steamer.",
  "★ Marcus and Priya are the most mentioned in guest reviews for their warm service and remembering drink preferences.",
  "★ Street parking is available nearby but may have time limits or fees.",
  "★ Gluten-free options are abundant, including a flourless chocolate torte that's rich but not too sweet.",
  "★ A magnetic \"do not disturb\" sign hangs on the door.",
  "★ Blackout curtains block out all light, and double-glazed windows keep out almost all outside noise, even from nearby traffic or late check-ins.",
  "★ Wine selection includes local drops from the Yarra and Margaret River regions, and there's a rotating cocktail list with playful names and seasonal ingredients.",
  "★ The tiles are matte stone.",
  "★ A card lists staff names and shift times.",
  "★ The dining room itself is open and airy, with large windows, timber floors, and soft pendant lighting.",
  "★ The minibar offers two local ginger beers, oat milk, dark chocolate, and a sparkling water, free of charge.",
  "★ The menu includes shakshuka, warm cookies, and classic brunch type meals.",
  "★ Breakfast includes both à la carte options and a hot-and-cold buffet—guests often mix and match.",
  "★ The playlist in the background is usually upbeat pop and light electronic music, not too loud.",
  "★ There's light background music throughout the day—usually a playlist of acoustic covers, Norah Jones, and the occasional bossa nova track in the mornings.",
  "★ The king bed is medium-firm with a supportive mattress and high-quality 500-thread-count sheets.",
  "★ The bathtub has a stool beside it for towels or drinks.",
  "★ Room service arrives on a wooden tray with real cutlery.",
  "★ There's also a full set of free weights up to 25kg, a bench, kettlebells, resistance bands, yoga mats, and a cable machine that can be adjusted for various workouts.",
  "★ A tip: if you're in a rush, there's a little sign that says \"Express Coffee Orders Here\"—most guests miss it.",
  "★ A large umbrella is in the closet.",
  "★ Some lobby furniture has been removed, but a small seating area remains near the lift bank.",
  "★ Guests cannot reserve parking in advance.",
  "★ Most guests report very quiet nights, with no sounds from adjoining rooms or hallways.",
  "★ Tables are spaced generously, with some tucked into cozy nooks near the back if you want a quieter experience.",
  "★ Double-glazed windows keep outside noise low and can be opened slightly.",
  "★ Electric vehicle charging stations are available.",
  "★ Kids' meals include spaghetti, mini burgers, and grilled chicken with mash, and the restaurant has high chairs and colouring kits if needed.",
  "★ The mirror has soft LED side lights.",
  "★ The room is designed for quiet, restful sleep.",
  "★ Toiletries are in black pump bottles—shampoo, conditioner, body wash, and hand soap.",
  "★ The shower is rainfall-style with strong, even water pressure and a single dial to adjust the temperature.",
  "★ Tap water is clean and drinkable.",
  "★ The sewing kit includes thread, buttons, and scissors.",
  "★ You can book by calling the front desk or pressing \"Dining\" on the in-room tablet.",
  "★ A wall-mounted screen displays time, weather, and hotel event updates.",
  "★ Staff will usually ask about allergies as you're seated.",
  "★ There's a DIY toast station with sourdough, rye, and gluten-free options, plus a three-slot conveyor toaster that's fast but tends to overdo the second round.",
  "★ There are also bar stools near the open kitchen for solo diners or guests curious to watch the chefs plate dishes.",
  "★ The hotel offers on-site parking for guests.",
  "★ The air-conditioning is silent and easy to adjust, with both cool and warm settings.",
  "★ There's also a detachable handheld shower wand, and the shower is fully enclosed with no water leakage.",
  "★ The king suite room has a king-sized bed with 500-thread-count sheets.",
  "★ The space is cleaned twice a day, and machines are checked weekly for maintenance.",
  "★ The outdoor terrace seats about 20 and catches the morning sun; it's a great spot for breakfast if the weather's clear.",
  "★ Mornings between 6 AM and 8 AM are the busiest, mostly with business travelers, so off-peak workouts are best after 10 AM or in the late evening.",
  "★ The air conditioner is silent and ceiling-mounted.",
  "★ Cleaning spray and paper towels are next to each station, and guests are expected to wipe down equipment after use.",
  "★ For lunch and dinner, the restaurant menu leans modern Australian with Southeast Asian and Mediterranean influences.",
  "★ Water heats quickly and stays consistent.",
  "★ A large TV is flush against the wall opposite the bed and supports Chromecast.",
  "★ The construction area is kept clean and sealed off for safety, and staff are on hand to assist with luggage or alternative entry points if needed.",
  "★ The room is well soundproofed.",
  "★ Towels are provided in a small stack near the door, along with a water cooler that dispenses both chilled and room-temp water.",
  "★ A full-length mirror stands near the door.",
  "★ The blackout curtains glide smoothly and block out light completely.",
  "★ The hotel's restaurant is located on the ground floor, just to the left of the main lobby, and serves food all day, with breakfast from 6:30 AM to 10:30 AM, lunch starting at 12, and dinner running until 9:30 PM.",
  "★ There are four pillows—two firm, two soft—and a grey throw blanket at the foot.",
  "★ Standout dishes include grilled barramundi with miso butter, a lamb shoulder with pomegranate glaze, and a roast cauliflower steak served over tahini and lentils.",
  "★ There's no personal trainer, but staff at the front desk can send up a basic printed workout plan on request.",
  "★ The barista, usually Ellie or James, takes coffee orders right at the table if you ask; flat whites and oat lattes are the most common.",
  "★ The dinner crowd tends to arrive later—around 7 PM is peak—so booking is smart, especially on Fridays and Saturdays.",
  "★ Toiletries are in black pump bottles—shampoo, conditioner, body wash, and hand soap.",
  "★ A little tip: ask for the house chilli oil or green herb sauce—they're not on the menu, but they elevate just about anything.",
  "★ The hotel gym is located on the mezzanine level, accessible via lift or stairs near the lobby.",
  "★ The made-to-order omelettes are a favorite; just tell the chef what you want—spinach, cheese, chorizo, red onion—and they'll hand it to you piping hot in about 3 minutes.",
  "★ Valet parking is available on request.",
  "★ The space is compact but well-equipped, with rubber flooring, full-length mirrors, and air-conditioning that keeps it cool even during busy hours.",
  "★ Payment for parking can be added to the room bill or paid at reception.",
  "★ The bathroom has underfloor heating, a rain shower, and a Japanese-style toilet with a heated seat.",
  "★ There are four pillows provided—two soft, two firmer—and more are available on request.",
  "★ There is currently light construction taking place in the hotel foyer.",
  "★ The carpark is secure and monitored by CCTV.",
  "★ A green velvet sofa and leather chair sit near a low table with a plaid throw.",
  "★ The dining room itself is open and airy, with large windows, timber floors, and soft pendant lighting.",
  "★ The construction area is kept clean and sealed off for safety.",
  "★ Floor staff are friendly and quick without being pushy.",
  "★ Clearance height is 2.1 metres.",
  "★ The wardrobe lights up when opened.",
  "★ The carpark connects directly to the lobby via elevator.",
  "★ The writing desk faces the window and has two USB ports, universal power outlets, and a drawer with stationery.",
  "★ Check-in has been relocated to a temporary desk just to the right of the main doors, where full services are still available.",
  "★ Some guests recommend running the hot water for a few seconds first thing in the morning, as it can take a moment to warm up.",
  "★ The main entrance remains open, but a temporary wall has been installed around the work zone, with clear signage and directions.",
  "★ During the day, mild noise from tools and equipment may be heard between 10 AM and 4 PM, though work is paused during peak check-in and check-out times.",
  "★ The lighting is bright but not harsh, and a small window lets in some natural light during the day.",
  "★ A touchscreen display near the entrance offers short guided routines—cardio, strength, and stretch—with step-by-step instructions.",
  "★ The hotel offers on-site parking for guests.",
  "★ Wine selection includes local drops from the Yarra and Margaret River regions.",
  "★ A loading zone is located out front for quick drop-offs."
];

// Keyword matching function (moved from frontend)
function matchesKeyword(sentence, keyword) {
  const lowerSentence = sentence.toLowerCase();
  const lowerKeyword = keyword.toLowerCase();
  
  // Check for partial word matches
  if (lowerSentence.includes(lowerKeyword)) {
    return true;
  }
  
  // Special category matching
  if (lowerKeyword.includes('bed') || lowerKeyword.includes('sleep') || lowerKeyword.includes('pillow') || lowerKeyword.includes('sheet')) {
    return lowerSentence.includes('pillow') || lowerSentence.includes('sleep') || lowerSentence.includes('sheet') || lowerSentence.includes('bed');
  }
  if (lowerKeyword.includes('food') || lowerKeyword.includes('eat') || lowerKeyword.includes('meal') || lowerKeyword.includes('breakfast') || lowerKeyword.includes('dinner')) {
    return lowerSentence.includes('breakfast') || lowerSentence.includes('dinner') || lowerSentence.includes('meal') || 
           lowerSentence.includes('menu') || lowerSentence.includes('toast') || lowerSentence.includes('omelette') || 
           lowerSentence.includes('chef') || lowerSentence.includes('restaurant') || lowerSentence.includes('food') ||
           lowerSentence.includes('buffet') || lowerSentence.includes('dining') || lowerSentence.includes('dishes');
  }
  if (lowerKeyword.includes('staff') || lowerKeyword.includes('service') || lowerKeyword.includes('employee')) {
    return lowerSentence.includes('marcus') || lowerSentence.includes('priya') || lowerSentence.includes('lena') || 
           lowerSentence.includes('ellie') || lowerSentence.includes('james') || lowerSentence.includes('staff') || 
           lowerSentence.includes('service') || lowerSentence.includes('barista') || lowerSentence.includes('chef');
  }
  if (lowerKeyword.includes('room') || lowerKeyword.includes('amenity') || lowerKeyword.includes('amenities')) {
    return lowerSentence.includes('room') || lowerSentence.includes('minibar') || lowerSentence.includes('tv') || 
           lowerSentence.includes('air-conditioning') || lowerSentence.includes('window') || lowerSentence.includes('desk') || 
           lowerSentence.includes('wardrobe') || lowerSentence.includes('bathroom');
  }
  if (lowerKeyword.includes('pool') || lowerKeyword.includes('gym') || lowerKeyword.includes('facility') || lowerKeyword.includes('facilities')) {
    return lowerSentence.includes('gym') || lowerSentence.includes('weights') || lowerSentence.includes('workout') || 
           lowerSentence.includes('terrace') || lowerSentence.includes('fitness');
  }
  if (lowerKeyword.includes('park') || lowerKeyword.includes('parking')) {
    return lowerSentence.includes('parking') || lowerSentence.includes('carpark') || lowerSentence.includes('valet');
  }
  if (lowerKeyword.includes('light') || lowerKeyword.includes('lighting')) {
    return lowerSentence.includes('light') || lowerSentence.includes('lighting') || lowerSentence.includes('lamp');
  }
  
  return false;
}

// Filter sentences based on keywords
function filterSentences(keywords) {
  if (!keywords.trim()) {
    return hotelSentences.join(' ');
  }
  
  const keywordArray = keywords.trim().split(/\s+/);
  const filteredSentences = hotelSentences.filter(sentence => {
    return keywordArray.some(keyword => matchesKeyword(sentence, keyword));
  });
  
  if (filteredSentences.length > 0) {
    const remainingSentences = hotelSentences.filter(sentence => !filteredSentences.includes(sentence));
    return filteredSentences.join(' ') + ' ——————— ' + remainingSentences.join(' ');
  }
  
  return hotelSentences.join(' ');
}

// API Routes
app.post('/api/filter-content', (req, res) => {
  try {
    const { keywords } = req.body;
    const filteredText = filterSentences(keywords || '');
    
    res.json({ 
      success: true,
      text: filteredText,
      isFiltered: keywords && keywords.trim().length > 0
    });
  } catch (error) {
    console.error('Error filtering content:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to filter content' 
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
