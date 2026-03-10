export const readingTest11 = {
  id: "test-11",
  title: "Reading Test 11",
  instruction: {
    bullets: [
      "Bo de Mai Hien key 6.0 chua dung rat nhieu chat xam, cong suc va tien bac cua ca doi ngu, duoc cap nhat chuan theo form ky thi Aptis moi nhat, giup cac ban lam quen voi dang cau hoi va cach tra loi, tu tin hon khi vao phong thi.",
      "Noi dung luon bam sat de thi thuc te, cac dap an deu la that va cap nhat lien tuc, hinh anh minh hoa sinh dong, lac quan, tao cam hung hoc tap, giup ban duy tri dong luc va hung thu voi tieng Anh.",
      "Men chuc cac ban hoc tot, yeu thich ngon ngu va co trai nghiem thu vi voi ky thi Aptis noi rieng va Tieng Anh noi chung, tu do gop phan dat duoc nhung muc tieu trong cuoc song!"
    ],
    closing: ["Tran trong,", "Dr. Lam."]
  },
  questions: [
    {
      id: "68d95aace275cb1c0b8b4586",
      type: "inline_select",
      sectionTitle:
        "[Mai Hien key 6.0] - Reading plus - part 1 - visit, room, hot, train, speak",
      prompt:
        "Read the email from Anna to her friend. Choose one word from the list for each gap. The first one is done for you.",
      items: [
        {
          id: "gap-1",
          prefix: "1. Yesterday I went to the museum to",
          suffix: "the new art exhibition.",
          options: ["drive", "play", "visit"],
          correctAnswer: "visit",
          explanation: "Visit hop voi ngu canh di bao tang de tham quan trien lam."
        },
        {
          id: "gap-2",
          prefix: "2. In the middle of the",
          suffix: ", there was a big tree - very unusual.",
          options: ["garden", "park", "room"],
          correctAnswer: "room",
          explanation: "Theo nghia cua cau, mot cai cay o giua room la dieu la lung."
        },
        {
          id: "gap-3",
          prefix: "3. The weather was very",
          suffix: "that day, so I felt quite tired.",
          options: ["cold", "hot", "rainy"],
          correctAnswer: "hot",
          explanation: "Hot giai thich hop ly cho viec cam thay met."
        },
        {
          id: "gap-4",
          prefix: "4. On the way home, I took the",
          suffix: ".",
          options: ["bike", "car", "train"],
          correctAnswer: "train",
          explanation: "Cum tu dung la took the train."
        },
        {
          id: "gap-5",
          prefix: "5. At the museum, I could",
          suffix: "with a tour guide about history.",
          options: ["sing", "speak", "write"],
          correctAnswer: "speak",
          explanation: "Speak with a tour guide la cach dien dat tu nhien nhat."
        }
      ],
      note: {
        paragraphs: [
          "1. Yesterday I went to the museum to visit the new art exhibition.",
          "2. In the middle of the room, there was a big tree - very unusual.",
          "3. The weather was very hot that day, so I felt quite tired.",
          "4. On the way home, I took the train.",
          "5. At the museum, I could speak with a tour guide about history."
        ]
      }
    },
    {
      id: "68c8e12fe275cbc0228b4573",
      type: "sentence_order",
      sectionTitle:
        "[Mai Hien key 6.0] - Reading plus - part 2 - A Day at the Office (Work day)",
      prompt:
        "The sentences below are from a short description about office life. Order the sentences to make a complete text. The first sentence of the story is an example.",
      intro: ["A Day at the Office"],
      opening:
        "0. The following description shows how one employee organizes her day at the office.",
      options: [
        "The office has flexible hours to accommodate employee schedules.",
        "Her desk is white, standing out in the open-plan office.",
        "She uses a calendar to plan her tasks for the shortened workweek.",
        "For lunch, she packs a homemade sandwich with fresh ingredients.",
        "After work, they relax by reading books on productivity and wellness."
      ],
      items: [
        {
          id: "step-1",
          prompt: "1.",
          correctAnswer: "The office has flexible hours to accommodate employee schedules."
        },
        {
          id: "step-2",
          prompt: "2.",
          correctAnswer: "Her desk is white, standing out in the open-plan office."
        },
        {
          id: "step-3",
          prompt: "3.",
          correctAnswer:
            "She uses a calendar to plan her tasks for the shortened workweek."
        },
        {
          id: "step-4",
          prompt: "4.",
          correctAnswer:
            "For lunch, she packs a homemade sandwich with fresh ingredients."
        },
        {
          id: "step-5",
          prompt: "5.",
          correctAnswer:
            "After work, they relax by reading books on productivity and wellness."
        }
      ],
      note: {
        paragraphs: [
          "0. The following description shows how one employee organizes her day at the office.",
          "1. The office has flexible hours to accommodate employee schedules.",
          "2. Her desk is white, standing out in the open-plan office.",
          "3. She uses a calendar to plan her tasks for the shortened workweek.",
          "4. For lunch, she packs a homemade sandwich with fresh ingredients.",
          "5. After work, they relax by reading books on productivity and wellness."
        ]
      }
    },
    {
      id: "68c8e332e275cbb3228b456f",
      type: "sentence_order",
      sectionTitle: "[Mai Hien key 6.0] - Reading plus - part 2 - A Sports Event",
      prompt:
        "The sentences below are from a short description of a sports day. Order the sentences to make a complete text. The first sentence of the story is an example.",
      intro: ["A Sports Event"],
      opening:
        "0. The following passage describes a fun sports event that brought adults and children together.",
      options: [
        "It started on Saturday morning, there was a 10-lane race for adults.",
        "There were sixty men and women, and among them, Ms. Kamus won the race with the fastest time.",
        "After she received the prize, the following time was dedicated to children's activities.",
        "Activities included football, swimming, skipping rope, and the children played happily together.",
        "After playing, the children were very hungry and ate with their parents."
      ],
      items: [
        {
          id: "step-1",
          prompt: "1.",
          correctAnswer:
            "It started on Saturday morning, there was a 10-lane race for adults."
        },
        {
          id: "step-2",
          prompt: "2.",
          correctAnswer:
            "There were sixty men and women, and among them, Ms. Kamus won the race with the fastest time."
        },
        {
          id: "step-3",
          prompt: "3.",
          correctAnswer:
            "After she received the prize, the following time was dedicated to children's activities."
        },
        {
          id: "step-4",
          prompt: "4.",
          correctAnswer:
            "Activities included football, swimming, skipping rope, and the children played happily together."
        },
        {
          id: "step-5",
          prompt: "5.",
          correctAnswer:
            "After playing, the children were very hungry and ate with their parents."
        }
      ],
      note: {
        paragraphs: [
          "0. The following passage describes a fun sports event that brought adults and children together.",
          "1. It started on Saturday morning, there was a 10-lane race for adults.",
          "2. There were sixty men and women, and among them, Ms. Kamus won the race with the fastest time.",
          "3. After she received the prize, the following time was dedicated to children's activities.",
          "4. Activities included football, swimming, skipping rope, and the children played happily together.",
          "5. After playing, the children were very hungry and ate with their parents."
        ]
      }
    },
    {
      id: "68d0e45ee275cb967b8b4582",
      type: "reading_match",
      sectionTitle:
        "[Mai Hien key 6.0] - Reading plus - part 4 - tech forward (Doan van mo phong) - tuong tu bai digital transfomation",
      prompt:
        "Read the passage quickly. Choose a heading for each numbered paragraph (1-7) from the drop-down box. There is one more heading than you need.",
      articleTitle: "TECH FORWARD",
      items: [
        {
          id: "paragraph-1",
          prompt: "1.",
          body:
            "In the digital age, the way humans engage with technology is constantly evolving. Rather than viewing devices as separate tools, people now experience them as extensions of daily life. From smartphones to wearable gadgets, technology is reshaping communication, decision-making, and even personal identity. This shift represents a redefinition of how humans and technology interact on multiple levels.",
          options: [
            "Boosting Productivity Through Intelligent Automation",
            "Building Innovative Tech Communities",
            "Concerns About Disparities in Access to Technology",
            "Focusing on Sustainable Digital Solutions",
            "Overreliance on Digital Interfaces",
            "Promoting Technology-Based Education Programs",
            "Redefining Human-Technology Interaction",
            "The Role of Entertainment in Digital Culture"
          ],
          correctAnswer: "Redefining Human-Technology Interaction",
          explanation: "Doan 1 noi ve viec moi quan he giua con nguoi va cong nghe dang duoc dinh nghia lai."
        },
        {
          id: "paragraph-2",
          prompt: "2.",
          body:
            "Smart automation is becoming a powerful force in the workplace. By taking over repetitive and routine tasks, automated systems free employees to focus on creativity, problem-solving, and strategic planning. Companies report significant productivity gains as they implement artificial intelligence, machine learning, and robotics to streamline processes and enhance efficiency.",
          options: [
            "Boosting Productivity Through Intelligent Automation",
            "Building Innovative Tech Communities",
            "Concerns About Disparities in Access to Technology",
            "Focusing on Sustainable Digital Solutions",
            "Overreliance on Digital Interfaces",
            "Promoting Technology-Based Education Programs",
            "Redefining Human-Technology Interaction",
            "The Role of Entertainment in Digital Culture"
          ],
          correctAnswer: "Boosting Productivity Through Intelligent Automation",
          explanation: "Doan 2 nhan manh tu dong hoa thong minh dang tang nang suat va hieu qua."
        },
        {
          id: "paragraph-3",
          prompt: "3.",
          body:
            "Education is transforming with the help of technology-driven initiatives. Online learning platforms, digital classrooms, and interactive simulations give students more flexible and engaging ways to acquire knowledge. Governments and institutions now actively promote these programs to reduce barriers and ensure more people gain essential digital skills for the future workforce.",
          options: [
            "Boosting Productivity Through Intelligent Automation",
            "Building Innovative Tech Communities",
            "Concerns About Disparities in Access to Technology",
            "Focusing on Sustainable Digital Solutions",
            "Overreliance on Digital Interfaces",
            "Promoting Technology-Based Education Programs",
            "Redefining Human-Technology Interaction",
            "The Role of Entertainment in Digital Culture"
          ],
          correctAnswer: "Promoting Technology-Based Education Programs",
          explanation: "Doan 3 tap trung vao viec thuc day giao duc dua tren cong nghe."
        },
        {
          id: "paragraph-4",
          prompt: "4.",
          body:
            "While technology offers many benefits, heavy dependence on digital interfaces can also create challenges. People often spend hours on screens, which may weaken interpersonal connections, reduce attention spans, and cause physical strain. Experts warn that balance is necessary so that digital tools remain useful aids without becoming overwhelming distractions.",
          options: [
            "Boosting Productivity Through Intelligent Automation",
            "Building Innovative Tech Communities",
            "Concerns About Disparities in Access to Technology",
            "Focusing on Sustainable Digital Solutions",
            "Overreliance on Digital Interfaces",
            "Promoting Technology-Based Education Programs",
            "Redefining Human-Technology Interaction",
            "The Role of Entertainment in Digital Culture"
          ],
          correctAnswer: "Overreliance on Digital Interfaces",
          explanation: "Doan 4 canh bao viec phu thuoc qua muc vao cac giao dien so."
        },
        {
          id: "paragraph-5",
          prompt: "5.",
          body:
            "Not everyone benefits equally from technological progress. In many areas, especially rural or underdeveloped regions, access to high-speed internet, modern devices, or digital training is limited. These gaps highlight a digital divide that can worsen social and economic inequalities, making equal access to technology a pressing concern.",
          options: [
            "Boosting Productivity Through Intelligent Automation",
            "Building Innovative Tech Communities",
            "Concerns About Disparities in Access to Technology",
            "Focusing on Sustainable Digital Solutions",
            "Overreliance on Digital Interfaces",
            "Promoting Technology-Based Education Programs",
            "Redefining Human-Technology Interaction",
            "The Role of Entertainment in Digital Culture"
          ],
          correctAnswer: "Concerns About Disparities in Access to Technology",
          explanation: "Doan 5 noi ve khoang cach cong nghe va su chenh lech trong kha nang tiep can."
        },
        {
          id: "paragraph-6",
          prompt: "6.",
          body:
            "Innovative tech communities are emerging worldwide, often formed through collaborations between startups, universities, and investors. These groups foster creativity, mentorship, and cooperation, giving rise to new products and solutions. By working together, members of such communities accelerate progress and inspire more people to explore technology-driven opportunities.",
          options: [
            "Boosting Productivity Through Intelligent Automation",
            "Building Innovative Tech Communities",
            "Concerns About Disparities in Access to Technology",
            "Focusing on Sustainable Digital Solutions",
            "Overreliance on Digital Interfaces",
            "Promoting Technology-Based Education Programs",
            "Redefining Human-Technology Interaction",
            "The Role of Entertainment in Digital Culture"
          ],
          correctAnswer: "Building Innovative Tech Communities",
          explanation: "Doan 6 noi ve viec hinh thanh va phat trien cac cong dong cong nghe sang tao."
        },
        {
          id: "paragraph-7",
          prompt: "7.",
          body:
            "Technology is no longer just about speed and convenience. It must also be sustainable. Modern developers and organizations emphasize eco-friendly digital practices, such as reducing energy consumption in data centers, creating recyclable devices, and designing long-lasting software solutions. The focus is on sustainability to ensure digital growth supports both people and the planet.",
          options: [
            "Boosting Productivity Through Intelligent Automation",
            "Building Innovative Tech Communities",
            "Concerns About Disparities in Access to Technology",
            "Focusing on Sustainable Digital Solutions",
            "Overreliance on Digital Interfaces",
            "Promoting Technology-Based Education Programs",
            "Redefining Human-Technology Interaction",
            "The Role of Entertainment in Digital Culture"
          ],
          correctAnswer: "Focusing on Sustainable Digital Solutions",
          explanation: "Doan 7 nhan manh huong phat trien cong nghe xanh va ben vung."
        }
      ],
      note: {
        paragraphs: [
          "1. Redefining Human-Technology Interaction",
          "2. Boosting Productivity Through Intelligent Automation",
          "3. Promoting Technology-Based Education Programs",
          "4. Overreliance on Digital Interfaces",
          "5. Concerns About Disparities in Access to Technology",
          "6. Building Innovative Tech Communities",
          "7. Focusing on Sustainable Digital Solutions"
        ]
      }
    }
  ]
};
