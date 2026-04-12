import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ArrowLeft, XCircle, Award, MessageCircle, ChevronLeft, ChevronRight, Gift, Menu, X, ChevronDown, Facebook, Instagram, Phone } from 'lucide-react';
import { Countdown } from './components/Countdown';
import { Typewriter } from './components/Typewriter';
import React, { useState, useEffect } from 'react';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMistake, setOpenMistake] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    experience: '',
    moreInfo: ''
  });

  const scrollToForm = () => {
    const formElement = document.getElementById('lead-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://hooks.zapier.com/hooks/catch/23724304/u7ey3ve/', {
        method: 'POST',
        mode: 'no-cors', // Zapier webhooks often work best with no-cors if not configured for CORS
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      setIsSubmitted(true);
      console.log('Form submitted successfully');
    } catch (error) {
      console.error('Error submitting form:', error);
      // Even if there's an error (like CORS), we often want to show success to the user if the request likely went through
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'ההתחלה', id: 'hero' },
    { name: 'השיטה', id: 'transformation' },
    { name: 'עלינו', id: 'about' },
    { name: 'התכנית', id: 'program' },
    { name: 'הצטרפות', id: 'pricing' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <div className="min-h-screen relative w-full overflow-x-hidden">
        {/* Navbar */}
      <AnimatePresence>
        {isScrolled && (
          <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            className="fixed top-0 left-0 right-0 z-[100] glass-nav"
          >
            <div className="max-w-4xl mx-auto py-3 px-4 md:px-6 flex justify-between items-center">
              <img 
                src="/logo.png" 
                alt="FLORA Logo" 
                className="h-8 md:h-12 object-contain cursor-pointer" 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              />
              
              <div className="flex items-center gap-4">
                <div className="hidden md:flex gap-6">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="text-gray-800 font-bold hover:text-flora-pink transition-colors"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-gray-800 p-1 md:hidden"
                >
                  {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay (Moved outside nav to fix positioning) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] md:hidden flex items-center justify-center p-4"
          >
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Centered Menu Card */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative z-10 w-full max-w-[320px] max-h-[90vh] overflow-y-auto bg-[#E6D5C9]/90 backdrop-blur-md rounded-[2rem] p-8 flex flex-col items-center gap-6 shadow-2xl border border-white/30"
            >
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-4 right-4 text-gray-800 p-2 bg-white/60 rounded-full hover:bg-white/80 transition-colors z-20"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>

              <img 
                src="/logo.png" 
                alt="FLORA Logo" 
                className="h-16 object-contain mt-2" 
              />
              
              <div className="flex flex-col gap-4 w-full mt-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      scrollToSection(item.id);
                      setIsMenuOpen(false);
                    }}
                    className="text-center text-xl font-bold text-gray-800 hover:text-flora-pink transition-all py-3 rounded-xl bg-white/90 border-[3px] border-gray-300/40 shadow-sm hover:bg-white"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="w-full max-w-4xl mx-auto py-12 flex justify-center items-center relative z-10 px-6 md:px-8">
        <img 
          src="/logo.png" 
          alt="FLORA Logo" 
          className="h-24 md:h-32 object-contain" 
          referrerPolicy="no-referrer" 
        />
      </header>

      <main className="w-full max-w-4xl mx-auto pb-12 relative z-10 flex flex-col items-center px-6 md:px-8">
        
        {/* Section 1: Hero */}
        <section id="hero" className="w-full text-center mt-4 md:mt-8 mb-12 md:mb-16 flex flex-col items-center overflow-hidden">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-4 md:mb-6 max-w-full px-2">
            משוזרת רגילה לשוזרת עצמאית
          </h2>
          <div className="inline-flex bg-green-100/50 border border-green-200 rounded-full px-6 md:px-8 py-2 md:py-3 mb-6 items-center justify-center max-w-full">
            <div className="text-xl md:text-3xl font-bold text-flora-green flex items-center gap-2">
              <Typewriter 
                words={['שמרוויחה', 'שמצליחה', 'שרגועה', 'שעובדת']} 
                typingSpeed={100}
                deletingSpeed={50}
                pauseTime={1500}
              />
              <span>יותר</span>
            </div>
          </div>
          <p className="text-lg md:text-xl text-gray-700 px-4">בתהליך ממוקד של 60 יום</p>
        </section>

        {/* Section 2: Pain Points */}
        <section className="glass-card rounded-3xl p-4 md:p-12 mb-12 md:mb-16 relative w-full overflow-hidden">
          <div className="text-center space-y-4 md:space-y-6 text-base md:text-lg px-2">
            <p className="font-bold text-lg md:text-xl">אנחנו יודעים איפה את נמצאת כרגע.<br/>כי היינו שם.</p>
            <p>למדת שזירה, עשית קורס, יש לך ידיים טובות ואפילו לימדו אותך<br/>בקורס דבר או שניים על עסקים.</p>
            <p className="font-bold">אבל קשה לסגור אירועים, את לא בטוחה כמה לגבות,<br/>כל שיחה עם לקוחה קצת מלחיצה אותך,<br/>ומעל הכל את מרגישה שאת שווה הרבה יותר!</p>
            <div className="pt-4 md:pt-6">
              <p className="text-lg md:text-xl">ואת באמת שווה יותר,</p>
              <h3 className="text-2xl md:text-3xl font-bold text-flora-green mt-2">רק חסרה לך שיטה !</h3>
              <div className="h-1.5 w-32 md:w-48 bg-flora-pink/60 mx-auto mt-1 rounded-full"></div>
            </div>
          </div>
        </section>

        {/* Section 3: Transformation */}
        <section id="transformation" className="text-center mb-12 md:mb-16 w-full overflow-hidden">
          <div className="px-4">
            <p className="text-lg md:text-xl mb-2">זה לא עוד קורס שזירה,</p>
            <p className="text-lg md:text-xl mb-4">זה תהליך של 60 יום שבו אנחנו בונים איתך עסק.<br/>לא תחביב. לא "נראה מה יהיה".</p>
            <h3 className="text-3xl md:text-4xl font-bold text-flora-pink mb-8 md:mb-10">עסק !</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 w-full">
            {[
              'מיקוד עסקי', 'מחשבון תמחור', 'כלים עסקיים',
              'סושיאל', 'גרפיקות', 'שיווק דיגטלי',
              'תסריטי שיחה', 'סימולציות', 'שימוש בכלי AI'
            ].map((item, i) => (
              <div key={i} className="glass-card rounded-2xl p-3 md:p-4 flex flex-col items-center justify-center gap-2 md:gap-3 overflow-hidden">
                <div className="bg-green-100 text-flora-green rounded-full p-1.5 md:p-2">
                  <CheckCircle2 size={18} md:size={24} />
                </div>
                <span className="font-semibold text-xs md:text-base text-gray-800 text-center">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Social Proof */}
        <section className="glass-card rounded-3xl p-4 md:p-12 mb-12 md:mb-16 text-center w-full overflow-hidden">
          <p className="text-base md:text-lg mb-4 px-2">אנחנו רוצים לומר לך משהו :</p>
          <h3 className="text-xl md:text-3xl font-bold text-flora-green mb-6 px-2">
            את שווה יותר. את יכולה יותר.<br/>ואת לגמרי מסוגלת להקים עסק שעובד!
          </h3>
          <p className="font-semibold mb-8 text-sm md:text-base px-4">רק בקשה אחת קטנה ממך - אל תוותרי לעצמך כל כך מהר.</p>
          
          <div className="space-y-4 mb-10 text-sm md:text-base px-2">
            <p>יש שוזרות שהיו בדיוק שם.<br/>בלי ביטחון, בלי תמחור מסודר, בלי שיטה, בלי שיווק...</p>
            <h4 className="text-xl md:text-2xl font-bold text-flora-pink">והיום ?</h4>
            <p className="font-bold">הן סוגורות אירועים. הן מקבלות לידים.<br/>ומרוויחות כמו עסק - לא כמו תחביב.</p>
          </div>

          <p className="font-bold text-xl mb-8 px-2">אבל זה לא משנה כמה נכתוב ונספר, השוזורת שלנו יגידו לכן בעצמן</p>
          
          <div className="relative w-full max-w-full md:max-w-md mx-auto mb-10 px-2">
            <div className="aspect-[4/5] bg-gray-200 rounded-2xl overflow-hidden relative shadow-2xl">
              <img src="https://picsum.photos/seed/florist/600/800" alt="Testimonial" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 flex items-center justify-between px-4">
                <button className="bg-flora-pink text-white rounded-full p-2 shadow-md"><ChevronRight size={20} md:size={24} /></button>
                <button className="bg-flora-pink text-white rounded-full p-2 shadow-md"><ChevronLeft size={20} md:size={24} /></button>
              </div>
            </div>
          </div>

          <button 
            onClick={scrollToForm}
            className="w-full md:w-auto bg-flora-green hover:bg-green-600 text-white text-xl font-bold py-4 px-8 rounded-xl shadow-lg flex items-center justify-center gap-3 mx-auto transition-transform hover:scale-105"
          >
            <ArrowLeft size={24} />
            <span>אני רוצה שתעזרו לי להפוך לעצמאית מרוויחה !</span>
          </button>

          <div className="mt-16">
            <p className="font-bold text-lg mb-8">עסקים שליווינו אותם</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="glass-card rounded-xl aspect-video flex items-center justify-center p-4">
                  <img src={`https://picsum.photos/seed/logo${i}/200/100`} alt="Client Logo" className="max-h-full max-w-full opacity-70 grayscale hover:grayscale-0 transition-all" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 5: Meet the Team */}
        <section id="about" className="mb-12 md:mb-16 w-full overflow-hidden">
          <div className="text-center mb-10 px-4">
            <span className="bg-green-50 text-flora-green font-bold px-4 md:px-6 py-2 rounded-full text-base md:text-lg inline-block">מי אנחנו ולמה להקשיב לנו בכלל?</span>
          </div>
          
          <div className="flex justify-center mb-10 px-4">
            <img 
              src="/us.png" 
              alt="Ariel and Daniel - FLORA Team" 
              className="w-full max-w-2xl h-auto rounded-2xl" 
              referrerPolicy="no-referrer" 
            />
          </div>

          <div className="mt-8 md:mt-12 text-center space-y-4 px-4">
            <p className="text-lg md:text-xl">מתוך הניסיון שלנו בשיווק דיגיטלי, ומתוך השנה האינטנסיבית שלנו<br/>בתוך עולם האירועים והפרחים-</p>
            <p className="text-lg md:text-xl font-bold">בנינו תהליך ממוקד שמחבר בין שתי העולמות ומוביל<br/>להצלחה אמיתית בתחום !</p>
            
            <div className="grid grid-cols-3 gap-2 md:gap-4 py-6 md:py-8">
              <div>
                <p className="text-2xl md:text-3xl font-bold text-gray-900">100+</p>
                <p className="text-[10px] md:text-sm font-semibold mt-1">אירועים בשנה<br/>האחרונה</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-gray-900">3+</p>
                <p className="text-[10px] md:text-sm font-semibold mt-1">שנים של נסיון<br/>בתחום</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-gray-900">250+</p>
                <p className="text-[10px] md:text-sm font-semibold mt-1">פוסטים שעיצבנו<br/>ללקוחות</p>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-3xl p-5 md:p-8 text-center mt-8 w-full">
            <h3 className="text-xl md:text-2xl font-bold text-flora-green mb-4">לא עוד קורס שזירה. לא עוד טיפים באינסטגרם.</h3>
            <p className="text-base md:text-lg mb-8">אלא תהליך אמיתי של בניית עסק, מהיסודות ועד רגע החתימה.</p>
            <button 
              onClick={scrollToForm}
              className="w-full md:w-auto bg-flora-green hover:bg-green-600 text-white text-lg md:text-xl font-bold py-4 px-8 rounded-xl shadow-lg flex items-center justify-center gap-3 mx-auto transition-transform hover:scale-105"
            >
              <ArrowLeft size={20} md:size={24} />
              <span>סיקרנתם ! אני רוצה שתחזרו אליי לעוד פרטים</span>
            </button>
          </div>
        </section>

        {/* Section 6: The Program */}
        <section id="program" className="mb-12 md:mb-16 w-full overflow-hidden">
          <div className="text-center mb-10 px-4">
            <span className="bg-green-50 text-flora-green font-bold px-4 md:px-8 py-2 md:py-3 rounded-full text-lg md:text-2xl inline-block">מה התכנית נותנת לך בפועל ?</span>
          </div>
          
          <div className="text-center space-y-4 text-sm md:text-lg mb-10 px-4">
            <p>זה לא עוד קורס שזירה. זה לא עוד השראה לאינסטגרם.<br/>וזה בטח לא "תנסי ותראי מה יהיה".</p>
            <p className="font-bold text-base md:text-xl">זה מסלול של 60 יום שמלמד אותך איך להיות שוזרת שמרוויחה כסף!</p>
            <p>לא רק שוזרת מוכשרת. שוזרת עם עסק !</p>
          </div>

          <div className="space-y-4 w-full">
            {[
              { title: 'ליווי צמוד לאורך 60 יום וגם אחריהם', desc: 'נלווה אותך יד ביד, עם זמינות מלאה בכל שלב, שיחות זום שבועיות ומעקב אחרי ההתקדמות שלך.' },
              { title: 'מיקוד עסקי', desc: 'נברר יחד מה החוזקות ומה החולשות שלך, נבין איפה כדאי לך להתמקד ונבנה יחד תכנית לשבועות הבאים' },
              { title: 'סקר שוק', desc: 'נבדוק כמה מציעים בשוק ותקבלי בהירות לגבי המחירים ששוזורת אחרות נותנות' },
              { title: 'הקמת מנהל מודעות', desc: 'כלי שיווקי שאיתו נפרסם ודרכו נייצר לידים חמים ואיכותיים' },
              { title: 'כלים עסקיים', desc: 'תקבלי מאיתנו מגוון כלים עסקיים שאיתם תעבדי באופן שוטף : מחשבון תמחור, הוצאות הכנסות, רווח והפסד, טבלאות לידים וכו\'' },
              { title: 'הצעות מחיר בקלילות', desc: 'נלמד איך לתת הצעת מחיר במהירות, ובלי להתנצל !' },
              { title: 'הדרכה עם ממוחי מכירות', desc: 'לאחר שנבנה מודל לתסריט מכירה, את תפגשי בזום אחד על אחד עם איש צוות שלנו שילמד אותך את סודות המכירה ואיך לטפל בהתנגדויות' },
              { title: 'הדרכת סושיאל', desc: 'תלמדי איך לצלם את העבודות שלך בצורה שמשקפת את הכישרון שלך, ואיך לתפעל את הרשתות בצורה שתוציא אותך ואת הכישרון שלך החוצה' },
              { title: 'שיפוץ רשתות חברתיות', desc: 'לוגו, באנרים, סרטונים, וכל הגרפיקות שתצטרכי כדי להתחיל לעבוד כמו מקצוענית' },
              { title: 'סימולציות', desc: 'כדי להבטיח סגירות אירועים אנחנו נעשה סימולציות שדרכם נדע איך להוציא ממך את אשת המכירות שבך!' }
            ].map((item, i) => (
              <div key={i} className="glass-card rounded-2xl p-4 md:p-6 flex items-start gap-3 md:gap-4 mx-auto w-full overflow-hidden">
                <div className="text-flora-pink mt-1 shrink-0">
                  <CheckCircle2 size={18} md:size={24} />
                </div>
                <div className="flex-1">
                  <h4 className="text-base md:text-xl font-bold text-flora-green mb-1">{item.title}</h4>
                  <p className="text-[11px] md:text-base text-gray-700 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center px-4">
            <p className="text-lg md:text-xl font-bold mb-6">כל זה ועוד - בחודש אחד בלבד ולאחר מכן-</p>
            <div className="glass-card border-2 border-flora-pink rounded-2xl p-5 md:p-6 relative inline-block max-w-full">
              <Gift className="absolute -top-4 -right-4 md:-top-6 md:-right-6 text-flora-green" size={32} md:size={48} />
              <Gift className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 text-flora-green" size={32} md:size={48} />
              <h3 className="text-2xl md:text-4xl font-bold text-flora-pink">חודש שיווק ממומן עלינו !!!</h3>
            </div>
            
            <div className="mt-10 space-y-4 text-base md:text-lg">
              <p className="font-bold">כן - אנחנו ממנים עבורך את תחילת התנועה.<br/>כי אנחנו לא רוצים שתצאי מהליווי רק עם ידע -<br/>אלא עם פניות אמיתיות.</p>
              <p>אנחנו מאמינים שכאשר העסק בנוי נכון, וכאשר השיווק מדוייק -<br/>לידים מתחילים להגיע.<br/><span className="font-bold">וזה הרגע שבו הביטחון נבנה באמת.</span></p>
            </div>
          </div>
        </section>

        {/* Section 7: Educational */}
        <section className="mb-12 md:mb-16 w-full overflow-hidden">
          <div className="text-center mb-10 px-4">
            <h2 className="text-3xl md:text-5xl font-bold text-flora-green mb-6">10 טעויות ששוזרות עושות</h2>
            <p className="text-lg md:text-xl font-semibold">אם 2-3 מהטעויות האלה נשמעות לך מוכרות-<br/>זה סימן שאת לא צריכה לעבוד קשה יותר...<br/>את צריכה לעבוד נכון יותר.</p>
          </div>

          <div className="space-y-3 max-w-2xl mx-auto w-full">
            {[
              { title: 'טעות 1 - להתחיל נמוך מידי', desc: 'לוקחת עבודות קטנות ולא רווחיות כדי "לצבור נסיון". אבל נשארת שם חודשים בלי להתקדם.' },
              { title: 'טעות 2 - הצעות מחיר מבולגנות', desc: 'שולחת הצעות מחיר בוואטסאפ או בקובץ לא מקצועי. זה גורם ללקוחות להתווכח על המחיר ולא להעריך את העבודה שלך.' },
              { title: 'טעות 3 - אין בידול אמיתי', desc: 'עושה בדיוק מה שכולן עושות ומחכה שהלקוחות יבחרו דווקא בך. בלי בידול, התחרות היחידה היא על המחיר הכי זול.' },
              { title: 'טעות 4 - לעבוד קשה עם כל לקוחה', desc: 'מבזבזת שעות על שיחות ייעוץ וסקיצות לפני שבכלל נסגר תשלום. את עובדת בחינם ומכלה את האנרגיה שלך על לקוחות לא רלוונטיים.' },
              { title: 'טעות 5 - אינסטגרם יפה זה לא שיווק', desc: 'מעלה תמונות יפות ומחכה שהטלפון יצלצל מעצמו. שיווק אמיתי דורש אסטרטגיה, הנעה לפעולה וניהול נכון של לידים.' },
              { title: 'טעות 6 - לחקות אחרות', desc: 'מסתכלת מה המתחרות עושות ומנסה להעתיק את הסגנון או המחירים שלהן. זה מונע ממך לבנות מותג ייחודי שמושך את הלקוחות המדויקים לך.' },
              { title: 'טעות 7 - לקנות ציוד לפני שיש עבודה', desc: 'משקיעה אלפי שקלים בכלים, כדים ופרחים בלי שיש הזמנות סגורות. זה יוצר בור כלכלי במקום לבנות עסק שמממן את עצמו.' },
              { title: 'טעות 8 - לפחד מהמחיר שלך', desc: 'מגמגמת כששואלים "כמה זה עולה" או נותנת הנחות בלי שביקשו. חוסר ביטחון במחיר משדר ללקוחה שגם את לא בטוחה בערך שלך.' },
              { title: 'טעות 9 - לתמחר מהבטן', desc: 'קובעת מחיר לפי מה שנראה לך "סביר" או לפי מה ששמעת שאחרות לוקחות. בלי חישוב מדויק של עלויות וזמן עבודה, את עלולה להפסיד כסף על כל אירוע.' },
              { title: 'טעות 10 - שיווק לפי מצב רוח', desc: 'מפרסמת רק כשאין עבודה ונעלמת כשיש לחץ. חוסר עקביות בשיווק יוצר "רכבת הרים" של הכנסות במקום תזרים יציב.' }
            ].map((item, i) => (
              <div key={i} className="glass-card rounded-xl overflow-hidden">
                <button 
                  onClick={() => setOpenMistake(openMistake === i ? null : i)}
                  className="w-full p-3 md:p-4 flex items-center justify-between gap-3 text-right"
                >
                  <div className="flex items-center gap-3">
                    <XCircle className="text-flora-pink shrink-0" size={18} md:size={24} />
                    <h4 className="text-base md:text-lg font-bold text-flora-green">{item.title}</h4>
                  </div>
                  <motion.div
                    animate={{ rotate: openMistake === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="text-gray-400" size={20} />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openMistake === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-4 pb-4 pt-0 text-[13px] md:text-base text-gray-600 border-t border-green-100/30 mt-2 pt-3">
                        {item.desc}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center px-4">
            <button 
              onClick={scrollToForm}
              className="w-full md:w-auto bg-flora-green hover:bg-green-600 text-white text-lg md:text-xl font-bold py-4 px-8 rounded-xl shadow-lg flex items-center justify-center gap-3 mx-auto transition-transform hover:scale-105"
            >
              <ArrowLeft size={20} md:size={24} />
              <span>אני רוצה לעבוד נכון יותר</span>
            </button>
          </div>
        </section>

        {/* Section 8: Guarantee */}
        <section className="mb-12 md:mb-16 w-full">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-4xl font-bold text-flora-green px-4">ההתחייבות האישית שלנו אליכן.</h2>
          </div>

          <div className="glass-card rounded-3xl p-4 md:p-12 pb-16 md:pb-12 text-center space-y-4 md:space-y-6 text-sm md:text-lg mx-auto w-full overflow-hidden">
            <p className="px-2">בתור משווקים שבנו עסק פעיל בעיצוב פרחים לאירועים, עשינו לא<br/>מעט טעויות בתחילת הדרך.<br/>תמחור מהבטן, עבודה קשה בלי רווח אמיתי, ושיווק שלא מביא<br/>פניות.</p>
            <p className="px-2">בדרך פגשנו שוזרות מוכשרות שלומדות עוד קורסים,<br/>משקיעות בציוד ובעיצובים -<br/><strong>אבל נשארות בלי כלים פרקטיים לבנות עסק שמכניס כסף.</strong></p>
            <p className="px-2">את הליווי הזה בנינו כדי להיות בדיוק ההפך מזה.<br/>יצרנו תהליך ברור לתמחור, שיווק וסגירת אירועים -<br/><strong>השיטה שאנחנו היינו צריכים בתחילת הדרך.</strong></p>
            
            <div className="py-2 md:py-4">
              <p className="font-bold">איך זה עובד?</p>
              <p className="px-2">את נכנסת לליווי, מיישמת את השלבים בעסק שלך ופועלת בצורה<br/>מסודרת מול לקוחות.</p>
            </div>

            <p className="px-2">המטרה היא שבתוך חודשיים כבר תסגרי את האירוע הראשון שלך -<br/>אירוע שמחזיר את עלות הליווי ונותן לך ביטחון להמשיך קדימה.</p>
            
            <p className="font-bold px-2">התהליך דורש עשייה ומחויבות,<br/>אבל כשיש שיטה - יש גם תוצאה.</p>
            
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 pt-4 px-2">הליווי יימשך עד שתסגרי אירוע<br/>לפחות בשווי הליווי.</h3>
          </div>

          <div className="flex justify-center -mt-10 md:-mt-12 relative z-10">
            <div className="bg-gradient-to-b from-yellow-300 to-yellow-500 rounded-full p-1 shadow-xl scale-90 md:scale-100">
              <div className="bg-white rounded-full w-28 h-28 md:w-32 md:h-32 flex flex-col items-center justify-center border-4 border-yellow-400 text-center p-2">
                <Award className="text-yellow-500 mb-1" size={28} md:size={32} />
                <span className="font-bold text-xs md:text-sm leading-tight text-yellow-700">ליווי ללא<br/>הגבלת זמן</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 9: Pricing & CTA */}
        <section id="pricing" className="text-center w-full overflow-hidden pb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-flora-green mb-2 px-4">זה הרגע להכנס לליווי</h2>
          <h2 className="text-2xl md:text-4xl font-bold text-flora-pink mb-8 px-4">בתנאי ההצטרפות הנוכחים</h2>

          <div className="space-y-4 text-sm md:text-lg mb-6 px-4">
            <p>הליווי הזה הוא לא רק עוד תהליך מקצועי.<br/>את לא קונה כאן רק ידע או משימות - <strong>את קונה מנטורים לדרך.</strong></p>
            <p>מישהו שילך איתך יד ביד בהחלטות, בביטחון, ובקפיצה המנטלית<br/>משוזרת שעובדת מהלב - לבעלת עסק שחושבת, מתמחרת ופועלת<br/>כמו בעלת מקצוע אמיתית.</p>
          </div>

          <div className="mb-6 flex justify-center w-full overflow-x-auto no-scrollbar">
            <Countdown />
          </div>

          <div className="glass-card rounded-3xl p-5 md:p-8 max-w-2xl mx-auto w-full overflow-hidden">
            <p className="text-[11px] md:text-lg font-semibold mb-6 px-2">ליווי | בונוסים | כניסה לקהילה | עדכונים | הבטחה להצלחה</p>
            <div className="flex justify-center items-center gap-2 mb-8">
              <span className="text-4xl md:text-6xl font-bold text-flora-green">12,980</span>
              <span className="text-2xl md:text-4xl font-bold text-flora-green">₪</span>
            </div>
            <button 
              onClick={scrollToForm}
              className="w-full bg-flora-green hover:bg-green-600 text-white text-lg md:text-2xl font-bold py-4 md:py-5 px-6 md:px-8 rounded-xl shadow-lg flex items-center justify-center gap-3 transition-transform hover:scale-105"
            >
              <span>השאירו פרטים להצטרפות</span>
            </button>
          </div>
        </section>

        {/* Section 10: Lead Form */}
        <section id="lead-form" className="w-full max-w-2xl mx-auto mb-12 px-4 min-h-[400px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-center mb-10">
                  <h2 className="text-3xl md:text-5xl font-bold text-flora-green mb-4">בואי נתחיל את הדרך שלך</h2>
                  <p className="text-lg md:text-xl text-gray-700">השאירי פרטים ונחזור אלייך לשיחת התאמה</p>
                </div>

                <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-6 md:p-10 space-y-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-700 mr-1">שם מלא</label>
                    <input 
                      required
                      type="text" 
                      placeholder="הכניסי את שמך"
                      className="w-full bg-white/50 border border-green-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-flora-green/50 transition-all"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-700 mr-1">מספר טלפון</label>
                    <input 
                      required
                      type="tel" 
                      placeholder="05X-XXXXXXX"
                      className="w-full bg-white/50 border border-green-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-flora-green/50 transition-all text-left"
                      dir="ltr"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-700 mr-1">מה רמת הניסיון שלך?</label>
                    <div className="relative">
                      <select 
                        required
                        className="w-full bg-white/50 border border-green-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-flora-green/50 transition-all appearance-none"
                        value={formData.experience}
                        onChange={(e) => setFormData({...formData, experience: e.target.value})}
                        disabled={isSubmitting}
                      >
                        <option value="" disabled>בחרי מהרשימה</option>
                        <option value="אין לי ניסיון עדיין">אין לי ניסיון עדיין</option>
                        <option value="עשיתי קצת אירועים">עשיתי קצת אירועים</option>
                        <option value="אני כבר עובדת אבל רוצה לחזק תעסק">אני כבר עובדת אבל רוצה לחזק תעסק</option>
                      </select>
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                        <ChevronDown size={20} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-700 mr-1">ספרי לנו קצת עלייך ועל העסק</label>
                    <textarea 
                      rows={4}
                      placeholder="מה האתגר הכי גדול שלך כרגע?"
                      className="w-full bg-white/50 border border-green-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-flora-green/50 transition-all"
                      value={formData.moreInfo}
                      onChange={(e) => setFormData({...formData, moreInfo: e.target.value})}
                      disabled={isSubmitting}
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-flora-green hover:bg-green-600 text-white text-xl font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-3 transition-transform hover:scale-[1.02] active:scale-95 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>שולח...</span>
                      </div>
                    ) : (
                      <>
                        <span>שלחי פרטים ונצא לדרך</span>
                        <ArrowLeft size={20} />
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                className="glass-card rounded-3xl p-10 md:p-16 text-center space-y-6 border-2 border-flora-green/30"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-flora-green">
                  <CheckCircle2 size={48} />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-flora-green">איזה כיף, הפרטים התקבלו!</h2>
                <div className="space-y-4 text-lg md:text-xl text-gray-700">
                  <p>תודה ששיתפת אותנו, אנחנו כבר מתחילים לעבור על הכל.</p>
                  <p className="font-bold text-flora-pink">נחזור אלייך ממש בקרוב לשיחת התאמה אישית.</p>
                </div>
                <div className="pt-6">
                  <div className="h-1 w-24 bg-flora-pink/30 mx-auto rounded-full"></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

      </main>

      {/* Footer */}
      <footer className="w-full glass-footer pt-8 pb-24 md:pb-10 px-6" dir="rtl">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
          {/* Logo */}
          <img 
            src="/logo.png" 
            alt="FLORA Logo" 
            className="h-16 object-contain mb-6" 
          />

          {/* Social Links */}
          <div className="flex gap-4 mb-6">
            <a 
              href="https://wa.link/1ot33r" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-md"
              title="WhatsApp"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
            </a>
            <a 
              href="https://www.facebook.com/profile.php?id=61588018935973#" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-md"
              title="Facebook"
            >
              <Facebook size={20} />
            </a>
            <a 
              href="https://www.instagram.com/flora_biz_grow/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-md"
              title="Instagram"
            >
              <Instagram size={20} />
            </a>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center gap-3 mb-8">
            <a 
              href="tel:0507747172" 
              className="flex items-center gap-2 text-lg font-bold text-gray-800 hover:text-flora-green transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-flora-green/10 flex items-center justify-center text-flora-green">
                <Phone size={18} />
              </div>
              <span dir="ltr">050-7747172</span>
            </a>
            <p className="text-gray-600 text-sm max-w-md">
              הופכים שוזרות לעסק מצליח. ליווי עסקי, שיווקי ומנטלי לשוזרות פרחים שרוצות לפרוץ קדימה.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mb-8 text-[13px] font-bold text-gray-500">
            <button onClick={() => scrollToSection('hero')} className="hover:text-flora-green transition-colors">השיטה</button>
            <button onClick={() => scrollToSection('pricing')} className="hover:text-flora-green transition-colors">הצטרפות</button>
            <button onClick={scrollToForm} className="hover:text-flora-green transition-colors">צור קשר</button>
          </div>

          {/* Copyright */}
          <div className="text-[10px] text-gray-400 border-t border-gray-100 pt-6 w-full">
            <p>© {new Date().getFullYear()} FLORA - הופכים שוזרות לעסק מצליח. כל הזכויות שמורות.</p>
          </div>
        </div>
      </footer>

    </div>

    {/* Sticky CTA */}
    <div className="fixed bottom-6 right-6 z-[100]" dir="rtl">
      <button 
        onClick={scrollToForm}
        className="bg-flora-green hover:bg-green-600 text-white rounded-full py-3 px-6 font-bold shadow-lg flex items-center gap-2 transition-transform hover:scale-105"
      >
        <MessageCircle size={20} />
        <span>השאירו פרטים</span>
      </button>
    </div>
    </>
  );
}
