export interface FaqItem {
  id: string
  category: string
  question: string
  answer: string
  icon?: any
}

export const allFaqsData: FaqItem[] = [
  // 1. Curriculum & Boards
  {
    id: 'cb-1',
    category: 'Curriculum & Boards',
    question: 'What boards and curricula does Hodu Academy teach?',
    answer: 'Hodu Academy provides specialized, syllabus-aligned coaching for Cambridge International (IGCSE & A-Levels), International Baccalaureate (IB MYP & DP), CBSE Board (Classes 9 to 12 Science, Commerce & Humanities), ICSE/ISC, IIT-JEE (Main & Advanced), NEET-UG, and National/International Junior Olympiads (IMO, NSO, IEO, PRMO).',
  },
  {
    id: 'cb-2',
    category: 'Curriculum & Boards',
    question: 'How do you prepare students for Cambridge IGCSE and IB Diploma (DP)?',
    answer: 'Our international curriculum wing focuses on command words, past 15-year marking scheme breakdowns, criterion-based rubric assessment, Internal Assessment (IA) guidance, Theory of Knowledge (TOK) conceptual framing, and Extended Essay support under educators with international board accreditation.',
  },
  {
    id: 'cb-3',
    category: 'Curriculum & Boards',
    question: 'Is CBSE board coaching integrated with competitive exams (JEE/NEET)?',
    answer: 'Yes. For Class 11 and 12, we offer an Integrated Dual-Track System where fundamental NCERT board concepts and competitive advanced problem sets are taught concurrently, eliminating the need for students to attend separate tuitions.',
  },

  // 2. Jaipur Offline Campus
  {
    id: 'jc-1',
    category: 'Jaipur Offline Campus',
    question: 'Where is the Jaipur physical learning center located?',
    answer: 'Our flagship offline campus is located at Vaishali Extension, Jaipur, Rajasthan. It features acoustic-treated smart classrooms, an interactive digital library, and dedicated 1-on-1 faculty doubt cells.',
  },
  {
    id: 'jc-2',
    category: 'Jaipur Offline Campus',
    question: 'Is transportation facility available for Jaipur students?',
    answer: 'Yes! We provide safe, air-conditioned doorstep van transport equipped with real-time GPS tracking and dedicated support staff covering key residential zones across Jaipur.',
  },
  {
    id: 'jc-3',
    category: 'Jaipur Offline Campus',
    question: 'What are the library and silent study zone timings?',
    answer: 'The physical reference library and silent self-study rooms are open 6 days a week from 8:00 AM to 9:00 PM, with faculty mentors available throughout the evening for live doubt clearance.',
  },

  // 3. Admissions & Batch Sizes
  {
    id: 'ab-1',
    category: 'Admissions & Batches',
    question: 'What is the maximum student batch size at Hodu Academy?',
    answer: 'We strictly maintain an intimate 1:12 to 1:15 student-to-teacher ratio in every batch. This guarantees personalized conceptual monitoring, individual pace adjustments, and continuous mentor feedback.',
  },
  {
    id: 'ab-2',
    category: 'Admissions & Batches',
    question: 'How can a new student enroll or take a diagnostic assessment?',
    answer: 'You can book a free diagnostic test and campus tour online via our website or by calling +91-9257879555. Our academic counselors conduct a 45-minute diagnostic baseline assessment to recommend the ideal curriculum batch.',
  },
  {
    id: 'ab-3',
    category: 'Admissions & Batches',
    question: 'Are online interactive live batches available for outstation students?',
    answer: 'Yes! Students outside Jaipur can join our live interactive digital micro-batches via our high-speed LMS portal with real-time audio-video participation, digital whiteboard sharing, and recorded lecture archives.',
  },

  // 4. JEE, NEET & Olympiads
  {
    id: 'jn-1',
    category: 'JEE, NEET & Olympiads',
    question: 'How is the test series structured for IIT-JEE and NEET-UG?',
    answer: 'Our test series simulates the exact NTA computer-based testing interface. Students take bi-weekly part-syllabus tests and monthly full-length mock exams with in-depth analytics covering speed, accuracy, negative marking patterns, and All-India percentile benchmark ranking.',
  },
  {
    id: 'jn-2',
    category: 'JEE, NEET & Olympiads',
    question: 'Do you offer foundation coaching for Junior Olympiads (Classes 6 to 8)?',
    answer: 'Yes, our Junior Foundation & Talent Hunt track builds non-routine problem solving, speed mental arithmetic, logic matrices, and STEM curiosity for IMO, NSO, IGKO, and NTSE competitions.',
  },

  // 5. Study Materials & DPPs
  {
    id: 'sm-1',
    category: 'Study Materials & DPPs',
    question: 'What printed and digital study materials are provided?',
    answer: 'Every enrolled student receives comprehensive theory booklets, Daily Practice Problems (DPPs), past 15-year chapter-wise solved question banks, formula flashcards, and full LMS digital library access with 10,000+ interactive practice questions.',
  },
  {
    id: 'sm-2',
    category: 'Study Materials & DPPs',
    question: 'How do students get their daily doubts solved outside lecture hours?',
    answer: 'Students can attend daily 1-on-1 Faculty Doubt Desks between 4:00 PM and 7:30 PM at the Jaipur center or submit photo doubts 24/7 on the Hodu Academy LMS mobile portal for verified video/written faculty solutions within 2 hours.',
  },

  // 6. Fees & Scholarships
  {
    id: 'fs-1',
    category: 'Fees & Scholarships',
    question: 'Does Hodu Academy offer merit-based scholarships?',
    answer: 'Yes! We conduct the Hodu Academy Scholarship Assessment Test (HASAT). Students scoring top ranks can receive up to 90% tuition fee waivers based on academic merit and previous school board scores.',
  },
  {
    id: 'fs-2',
    category: 'Fees & Scholarships',
    question: 'What are the available fee payment options?',
    answer: 'We offer flexible semester-wise installments, annual upfront plans with early-bird discounts, and 0% interest EMI options through major banking partners.',
  },
]
