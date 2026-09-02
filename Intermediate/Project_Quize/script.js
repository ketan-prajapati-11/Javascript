// ============= Question Bank ========//
/**
 * Question Bank
 * -------------
 * Structure:
 * questionBank = [
 *   {
 *     category: "Math",
 *     levels: {
 *       easy:   [ { no, question, options: [4 strings], answer }, ...15 ],
 *       medium: [ ...15 ],
 *       hard:   [ ...15 ]
 *     }
 *   },
 *   { category: "Science",  levels: { easy: [...], medium: [...], hard: [...] } },
 *   { category: "History",  levels: { easy: [...], medium: [...], hard: [...] } }
 * ]
 *
 * `answer` always exactly matches one of the strings in `options`,
 * so verification is a simple equality check (see checkAnswer at the bottom).
 */

const questionBank = [
  {
    category: "Math",
    levels: {
      easy: [
        {
          no: 1,
          question: "What is 5 + 7?",
          options: ["10", "11", "12", "13"],
          answer: "12",
        },
        {
          no: 2,
          question: "What is 9 - 4?",
          options: ["3", "4", "5", "6"],
          answer: "5",
        },
        {
          no: 3,
          question: "What is 6 x 3?",
          options: ["16", "18", "20", "24"],
          answer: "18",
        },
        {
          no: 4,
          question: "What is 20 ÷ 4?",
          options: ["4", "5", "6", "8"],
          answer: "5",
        },
        {
          no: 5,
          question: "What is 12 + 8?",
          options: ["18", "19", "20", "22"],
          answer: "20",
        },
        {
          no: 6,
          question: "How many sides does a triangle have?",
          options: ["2", "3", "4", "5"],
          answer: "3",
        },
        {
          no: 7,
          question: "What is 10 x 10?",
          options: ["10", "100", "1000", "20"],
          answer: "100",
        },
        {
          no: 8,
          question: "What is half of 50?",
          options: ["20", "25", "30", "15"],
          answer: "25",
        },
        {
          no: 9,
          question: "What is 7 + 6?",
          options: ["12", "13", "14", "11"],
          answer: "13",
        },
        {
          no: 10,
          question: "What number comes right after 99?",
          options: ["100", "98", "101", "90"],
          answer: "100",
        },
        {
          no: 11,
          question: "What is 15 - 9?",
          options: ["4", "5", "6", "7"],
          answer: "6",
        },
        {
          no: 12,
          question: "How many minutes are there in one hour?",
          options: ["30", "45", "60", "100"],
          answer: "60",
        },
        {
          no: 13,
          question: "What is 3 squared (3²)?",
          options: ["6", "9", "12", "3"],
          answer: "9",
        },
        {
          no: 14,
          question: "What is the sum of all angles in a triangle?",
          options: ["90°", "180°", "270°", "360°"],
          answer: "180°",
        },
        {
          no: 15,
          question: "What is 100 - 45?",
          options: ["45", "50", "55", "65"],
          answer: "55",
        },
      ],
      medium: [
        {
          no: 1,
          question: "What is 12 × 12?",
          options: ["124", "144", "132", "154"],
          answer: "144",
        },
        {
          no: 2,
          question: "What is the square root of 81?",
          options: ["7", "8", "9", "10"],
          answer: "9",
        },
        {
          no: 3,
          question: "What is 15% of 200?",
          options: ["20", "25", "30", "35"],
          answer: "30",
        },
        {
          no: 4,
          question: "Solve for x: 3x = 21",
          options: ["6", "7", "8", "9"],
          answer: "7",
        },
        {
          no: 5,
          question: "What is π (pi) rounded to two decimal places?",
          options: ["3.12", "3.14", "3.16", "3.18"],
          answer: "3.14",
        },
        {
          no: 6,
          question:
            "What is the area of a rectangle with length 8 and width 5?",
          options: ["13", "35", "40", "45"],
          answer: "40",
        },
        {
          no: 7,
          question: "What is the perimeter of a square with side length 6?",
          options: ["12", "18", "24", "36"],
          answer: "24",
        },
        {
          no: 8,
          question: "What is 2 raised to the power of 5 (2⁵)?",
          options: ["16", "32", "64", "10"],
          answer: "32",
        },
        {
          no: 9,
          question:
            "In a right triangle, if one angle is 90° and another is 45°, what is the third angle?",
          options: ["30°", "35°", "45°", "55°"],
          answer: "45°",
        },
        {
          no: 10,
          question: "What is the LCM (Least Common Multiple) of 4 and 6?",
          options: ["8", "10", "12", "24"],
          answer: "12",
        },
        {
          no: 11,
          question: "What is the GCD (Greatest Common Divisor) of 18 and 24?",
          options: ["3", "6", "9", "12"],
          answer: "6",
        },
        {
          no: 12,
          question: "What is 7² − 4²?",
          options: ["23", "33", "45", "49"],
          answer: "33",
        },
        {
          no: 13,
          question: "Convert 3/4 into a percentage.",
          options: ["34%", "65%", "75%", "80%"],
          answer: "75%",
        },
        {
          no: 14,
          question: "What is the next number in the sequence 2, 4, 8, 16, ...?",
          options: ["18", "24", "30", "32"],
          answer: "32",
        },
        {
          no: 15,
          question:
            "What is the sum of the interior angles of a quadrilateral?",
          options: ["180°", "270°", "360°", "450°"],
          answer: "360°",
        },
      ],
      hard: [
        {
          no: 1,
          question: "What is the derivative of x² with respect to x?",
          options: ["x", "2x", "x²", "2"],
          answer: "2x",
        },
        {
          no: 2,
          question: "Solve 2x² − 8 = 0 for the positive value of x.",
          options: ["1", "2", "3", "4"],
          answer: "2",
        },
        {
          no: 3,
          question: "What is the value of log₁₀(1000)?",
          options: ["2", "3", "4", "10"],
          answer: "3",
        },
        {
          no: 4,
          question: "What is the sum of the first 10 natural numbers?",
          options: ["45", "50", "55", "60"],
          answer: "55",
        },
        {
          no: 5,
          question: "What is the value of sin(90°)?",
          options: ["0", "0.5", "1", "-1"],
          answer: "1",
        },
        {
          no: 6,
          question: "What is the determinant of a 2×2 identity matrix?",
          options: ["0", "1", "2", "-1"],
          answer: "1",
        },
        {
          no: 7,
          question: "Simplify: (x + 3)(x − 3)",
          options: ["x² − 6", "x² + 9", "x² − 9", "x² − 3"],
          answer: "x² − 9",
        },
        {
          no: 8,
          question:
            "What is the probability of rolling a sum of 7 with two standard six-sided dice?",
          options: ["1/12", "1/6", "1/4", "1/36"],
          answer: "1/6",
        },
        {
          no: 9,
          question: "What is the integral of 2x dx?",
          options: ["x + C", "x² + C", "2x² + C", "x²/2 + C"],
          answer: "x² + C",
        },
        {
          no: 10,
          question:
            "What is the value of e (Euler's number) rounded to two decimal places?",
          options: ["2.14", "2.50", "2.72", "3.14"],
          answer: "2.72",
        },
        {
          no: 11,
          question: "How many prime numbers are there between 1 and 20?",
          options: ["6", "7", "8", "9"],
          answer: "8",
        },
        {
          no: 12,
          question: "What is the sum of interior angles in a hexagon?",
          options: ["540°", "630°", "720°", "900°"],
          answer: "720°",
        },
        {
          no: 13,
          question: "What is the value of 5! (5 factorial)?",
          options: ["60", "100", "120", "150"],
          answer: "120",
        },
        {
          no: 14,
          question:
            "If cos(θ) = 0, what is the principal value of θ in degrees?",
          options: ["0°", "45°", "90°", "180°"],
          answer: "90°",
        },
        {
          no: 15,
          question:
            "In the quadratic formula for ax² + bx + c = 0, what is the discriminant?",
          options: ["b² − 4ac", "b² + 4ac", "4ac − b²", "a² − 4bc"],
          answer: "b² − 4ac",
        },
      ],
    },
  },
  {
    category: "Science",
    levels: {
      easy: [
        {
          no: 1,
          question: "What planet is known as the Red Planet?",
          options: ["Venus", "Mars", "Jupiter", "Saturn"],
          answer: "Mars",
        },
        {
          no: 2,
          question:
            "What gas do plants absorb from the atmosphere for photosynthesis?",
          options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"],
          answer: "Carbon dioxide",
        },
        {
          no: 3,
          question:
            "What is the boiling point of water at sea level in Celsius?",
          options: ["50°C", "90°C", "100°C", "120°C"],
          answer: "100°C",
        },
        {
          no: 4,
          question: "How many legs does a spider have?",
          options: ["6", "8", "10", "12"],
          answer: "8",
        },
        {
          no: 5,
          question: "What is the closest star to Earth?",
          options: ["Proxima Centauri", "The Sun", "Sirius", "Polaris"],
          answer: "The Sun",
        },
        {
          no: 6,
          question: "Which organ pumps blood through the human body?",
          options: ["Lungs", "Brain", "Heart", "Liver"],
          answer: "Heart",
        },
        {
          no: 7,
          question: "What do bees primarily produce?",
          options: ["Milk", "Silk", "Honey", "Wax only"],
          answer: "Honey",
        },
        {
          no: 8,
          question: "What is H₂O more commonly known as?",
          options: ["Salt", "Water", "Sugar", "Oxygen"],
          answer: "Water",
        },
        {
          no: 9,
          question: "What force pulls objects toward the Earth?",
          options: ["Magnetism", "Gravity", "Friction", "Tension"],
          answer: "Gravity",
        },
        {
          no: 10,
          question: "Which planet is closest to the Sun?",
          options: ["Venus", "Earth", "Mercury", "Mars"],
          answer: "Mercury",
        },
        {
          no: 11,
          question: "What is the most abundant gas in the air we breathe?",
          options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Helium"],
          answer: "Nitrogen",
        },
        {
          no: 12,
          question:
            "Which part of a plant is mainly responsible for photosynthesis?",
          options: ["Roots", "Stem", "Leaves", "Flowers"],
          answer: "Leaves",
        },
        {
          no: 13,
          question: "What is the freezing point of water in Celsius?",
          options: ["-10°C", "0°C", "10°C", "32°C"],
          answer: "0°C",
        },
        {
          no: 14,
          question: "Approximately how many bones are in the adult human body?",
          options: ["106", "156", "206", "256"],
          answer: "206",
        },
        {
          no: 15,
          question: "What natural satellite orbits the Earth?",
          options: ["The Sun", "Mars", "The Moon", "A comet"],
          answer: "The Moon",
        },
      ],
      medium: [
        {
          no: 1,
          question: "What is the chemical symbol for gold?",
          options: ["Ag", "Gd", "Au", "Go"],
          answer: "Au",
        },
        {
          no: 2,
          question: "Which organelle is known as the powerhouse of the cell?",
          options: ["Nucleus", "Ribosome", "Mitochondria", "Golgi body"],
          answer: "Mitochondria",
        },
        {
          no: 3,
          question: "What is the approximate speed of light in a vacuum?",
          options: [
            "150,000 km/s",
            "300,000 km/s",
            "450,000 km/s",
            "600,000 km/s",
          ],
          answer: "300,000 km/s",
        },
        {
          no: 4,
          question: "Which gas makes up about 78% of Earth's atmosphere?",
          options: ["Oxygen", "Nitrogen", "Argon", "Carbon dioxide"],
          answer: "Nitrogen",
        },
        {
          no: 5,
          question: "What is the pH value of pure water?",
          options: ["5", "6", "7", "8"],
          answer: "7",
        },
        {
          no: 6,
          question: "What type of energy is stored in food?",
          options: [
            "Kinetic energy",
            "Chemical energy",
            "Nuclear energy",
            "Thermal energy",
          ],
          answer: "Chemical energy",
        },
        {
          no: 7,
          question: "Which blood type is known as the universal donor?",
          options: ["AB positive", "O negative", "A positive", "B negative"],
          answer: "O negative",
        },
        {
          no: 8,
          question:
            "What is the process by which plants make their own food using sunlight?",
          options: [
            "Respiration",
            "Photosynthesis",
            "Digestion",
            "Transpiration",
          ],
          answer: "Photosynthesis",
        },
        {
          no: 9,
          question: "What is the SI unit of force?",
          options: ["Joule", "Pascal", "Newton", "Watt"],
          answer: "Newton",
        },
        {
          no: 10,
          question:
            "Which planet is commonly cited as having the most known moons?",
          options: ["Jupiter", "Saturn", "Neptune", "Uranus"],
          answer: "Saturn",
        },
        {
          no: 11,
          question: "What is the main function of red blood cells?",
          options: [
            "Fight infection",
            "Carry oxygen",
            "Clot blood",
            "Produce hormones",
          ],
          answer: "Carry oxygen",
        },
        {
          no: 12,
          question: "Which element has the atomic number 1?",
          options: ["Helium", "Hydrogen", "Lithium", "Carbon"],
          answer: "Hydrogen",
        },
        {
          no: 13,
          question: "What is the scientific study of earthquakes called?",
          options: ["Geology", "Meteorology", "Seismology", "Astronomy"],
          answer: "Seismology",
        },
        {
          no: 14,
          question:
            "Which vitamin is produced in the skin when exposed to sunlight?",
          options: ["Vitamin A", "Vitamin C", "Vitamin D", "Vitamin K"],
          answer: "Vitamin D",
        },
        {
          no: 15,
          question: "What is considered the smallest unit of life?",
          options: ["Atom", "Molecule", "Cell", "Tissue"],
          answer: "Cell",
        },
      ],
      hard: [
        {
          no: 1,
          question: "Which formula represents Newton's second law of motion?",
          options: ["E = mc²", "F = ma", "V = IR", "P = mv"],
          answer: "F = ma",
        },
        {
          no: 2,
          question: "What is the atomic number of carbon?",
          options: ["4", "6", "8", "12"],
          answer: "6",
        },
        {
          no: 3,
          question:
            "Which subatomic particle carries a negative electric charge?",
          options: ["Proton", "Neutron", "Electron", "Positron"],
          answer: "Electron",
        },
        {
          no: 4,
          question:
            "What is it called when a solid changes directly into a gas?",
          options: ["Evaporation", "Condensation", "Sublimation", "Deposition"],
          answer: "Sublimation",
        },
        {
          no: 5,
          question:
            "Which molecule is often called the energy currency of the cell?",
          options: ["DNA", "ATP", "RNA", "Glucose"],
          answer: "ATP",
        },
        {
          no: 6,
          question:
            "Which law states that energy cannot be created or destroyed, only transformed?",
          options: [
            "Law of gravity",
            "Law of conservation of energy",
            "Newton's third law",
            "Law of inertia",
          ],
          answer: "Law of conservation of energy",
        },
        {
          no: 7,
          question: "What term describes an organism's genetic makeup?",
          options: ["Phenotype", "Genotype", "Karyotype", "Ecotype"],
          answer: "Genotype",
        },
        {
          no: 8,
          question: "What is the SI unit of electrical resistance?",
          options: ["Volt", "Ampere", "Ohm", "Watt"],
          answer: "Ohm",
        },
        {
          no: 9,
          question:
            "What term describes the time required for half of a radioactive substance to decay?",
          options: [
            "Decay rate",
            "Half-life",
            "Isotope period",
            "Radiation cycle",
          ],
          answer: "Half-life",
        },
        {
          no: 10,
          question:
            "Which scientist proposed the theory of general relativity?",
          options: [
            "Isaac Newton",
            "Niels Bohr",
            "Albert Einstein",
            "Galileo Galilei",
          ],
          answer: "Albert Einstein",
        },
        {
          no: 11,
          question: "What is the chemical formula for common table salt?",
          options: ["KCl", "NaCl", "CaCl₂", "NaOH"],
          answer: "NaCl",
        },
        {
          no: 12,
          question:
            "What term describes a substance that speeds up a chemical reaction without being consumed?",
          options: ["Reactant", "Catalyst", "Solvent", "Inhibitor"],
          answer: "Catalyst",
        },
        {
          no: 13,
          question:
            "What is the name of the cell division process that produces gametes?",
          options: ["Mitosis", "Meiosis", "Binary fission", "Budding"],
          answer: "Meiosis",
        },
        {
          no: 14,
          question: "What is Avogadro's number approximately equal to?",
          options: ["3.14 × 10²³", "6.022 × 10²³", "9.8 × 10²³", "1.6 × 10²³"],
          answer: "6.022 × 10²³",
        },
        {
          no: 15,
          question:
            "What is the term for the bending of light as it passes between different media?",
          options: ["Reflection", "Diffraction", "Refraction", "Dispersion"],
          answer: "Refraction",
        },
      ],
    },
  },
  {
    category: "History",
    levels: {
      easy: [
        {
          no: 1,
          question: "Who was the first President of the United States?",
          options: [
            "Abraham Lincoln",
            "George Washington",
            "Thomas Jefferson",
            "John Adams",
          ],
          answer: "George Washington",
        },
        {
          no: 2,
          question: "In which year did World War II end?",
          options: ["1943", "1944", "1945", "1946"],
          answer: "1945",
        },
        {
          no: 3,
          question: "Which ancient civilization built the pyramids of Giza?",
          options: ["Romans", "Greeks", "Ancient Egyptians", "Mayans"],
          answer: "Ancient Egyptians",
        },
        {
          no: 4,
          question: "Who is credited with reaching the Americas in 1492?",
          options: [
            "Ferdinand Magellan",
            "Christopher Columbus",
            "Marco Polo",
            "Vasco da Gama",
          ],
          answer: "Christopher Columbus",
        },
        {
          no: 5,
          question:
            "Which war was fought between the Northern and Southern United States?",
          options: [
            "The Revolutionary War",
            "The Civil War",
            "World War I",
            "The Cold War",
          ],
          answer: "The Civil War",
        },
        {
          no: 6,
          question: "Who led Nazi Germany during World War II?",
          options: [
            "Joseph Stalin",
            "Benito Mussolini",
            "Adolf Hitler",
            "Winston Churchill",
          ],
          answer: "Adolf Hitler",
        },
        {
          no: 7,
          question:
            "Which country gifted the Statue of Liberty to the United States?",
          options: ["Spain", "France", "Italy", "England"],
          answer: "France",
        },
        {
          no: 8,
          question: "Which ancient wonder is located in Egypt?",
          options: [
            "The Colosseum",
            "The Great Pyramid of Giza",
            "The Hanging Gardens",
            "The Parthenon",
          ],
          answer: "The Great Pyramid of Giza",
        },
        {
          no: 9,
          question: "In which year did India gain independence?",
          options: ["1945", "1946", "1947", "1950"],
          answer: "1947",
        },
        {
          no: 10,
          question: "Who wrote the American Declaration of Independence?",
          options: [
            "Benjamin Franklin",
            "Thomas Jefferson",
            "George Washington",
            "John Adams",
          ],
          answer: "Thomas Jefferson",
        },
        {
          no: 11,
          question: "Julius Caesar was a famous ruler of which ancient empire?",
          options: [
            "Greek Empire",
            "Roman Empire",
            "Persian Empire",
            "Egyptian Empire",
          ],
          answer: "Roman Empire",
        },
        {
          no: 12,
          question:
            "What was the name of the ship that sank in 1912 after hitting an iceberg?",
          options: ["Titanic", "Lusitania", "Britannic", "Olympic"],
          answer: "Titanic",
        },
        {
          no: 13,
          question: "Who was the first person to walk on the Moon?",
          options: [
            "Buzz Aldrin",
            "Yuri Gagarin",
            "Neil Armstrong",
            "John Glenn",
          ],
          answer: "Neil Armstrong",
        },
        {
          no: 14,
          question:
            "Which wall divided East and West Berlin during the Cold War?",
          options: [
            "The Great Wall",
            "The Berlin Wall",
            "Hadrian's Wall",
            "The Iron Curtain",
          ],
          answer: "The Berlin Wall",
        },
        {
          no: 15,
          question:
            "Which British queen ruled for over 60 years in the 19th century?",
          options: [
            "Queen Elizabeth I",
            "Queen Victoria",
            "Queen Anne",
            "Queen Mary",
          ],
          answer: "Queen Victoria",
        },
      ],
      medium: [
        {
          no: 1,
          question: "Which treaty officially ended World War I?",
          options: [
            "Treaty of Paris",
            "Treaty of Versailles",
            "Treaty of Ghent",
            "Treaty of Vienna",
          ],
          answer: "Treaty of Versailles",
        },
        {
          no: 2,
          question:
            "Who was the Prime Minister of Britain for most of World War II?",
          options: [
            "Neville Chamberlain",
            "Winston Churchill",
            "Clement Attlee",
            "Anthony Eden",
          ],
          answer: "Winston Churchill",
        },
        {
          no: 3,
          question: "In which year did the French Revolution begin?",
          options: ["1776", "1789", "1799", "1804"],
          answer: "1789",
        },
        {
          no: 4,
          question:
            "Which empire was historically described as 'the empire on which the sun never sets'?",
          options: [
            "The Roman Empire",
            "The Ottoman Empire",
            "The British Empire",
            "The Spanish Empire",
          ],
          answer: "The British Empire",
        },
        {
          no: 5,
          question:
            "What is the name for the period of cultural rebirth in Europe following the Middle Ages?",
          options: [
            "The Enlightenment",
            "The Renaissance",
            "The Reformation",
            "The Industrial Revolution",
          ],
          answer: "The Renaissance",
        },
        {
          no: 6,
          question: "Which modern country was formerly known as Persia?",
          options: ["Iraq", "Iran", "Turkey", "Syria"],
          answer: "Iran",
        },
        {
          no: 7,
          question: "Who founded the Mongol Empire?",
          options: [
            "Kublai Khan",
            "Genghis Khan",
            "Attila the Hun",
            "Tamerlane",
          ],
          answer: "Genghis Khan",
        },
        {
          no: 8,
          question:
            "Which event is widely credited with triggering the start of World War I?",
          options: [
            "Sinking of the Lusitania",
            "Assassination of Archduke Franz Ferdinand",
            "Invasion of Poland",
            "The Treaty of Versailles",
          ],
          answer: "Assassination of Archduke Franz Ferdinand",
        },
        {
          no: 9,
          question: "The Korean War took place mainly between which years?",
          options: ["1939–1945", "1950–1953", "1955–1960", "1961–1965"],
          answer: "1950–1953",
        },
        {
          no: 10,
          question: "Who was the first Emperor of Rome?",
          options: ["Julius Caesar", "Nero", "Augustus", "Constantine"],
          answer: "Augustus",
        },
        {
          no: 11,
          question:
            "Vasco da Gama is credited with discovering a sea route from Europe to which country?",
          options: ["China", "India", "Japan", "Brazil"],
          answer: "India",
        },
        {
          no: 12,
          question:
            "Which 1215 document limited the power of the English monarchy?",
          options: [
            "The Bill of Rights",
            "Magna Carta",
            "The Petition of Right",
            "The English Constitution",
          ],
          answer: "Magna Carta",
        },
        {
          no: 13,
          question:
            "What is the name for the period of tension between the USA and USSR after World War II?",
          options: [
            "The Great War",
            "The Cold War",
            "The Iron Age",
            "The Silent War",
          ],
          answer: "The Cold War",
        },
        {
          no: 14,
          question: "Who led the Soviet Union during the Cuban Missile Crisis?",
          options: [
            "Joseph Stalin",
            "Nikita Khrushchev",
            "Leonid Brezhnev",
            "Mikhail Gorbachev",
          ],
          answer: "Nikita Khrushchev",
        },
        {
          no: 15,
          question:
            "After World War II, Korea was divided into North and South along which line?",
          options: [
            "The Equator",
            "The 38th parallel",
            "The Mason-Dixon line",
            "The Prime Meridian",
          ],
          answer: "The 38th parallel",
        },
      ],
      hard: [
        {
          no: 1,
          question: "Which 1815 battle marked Napoleon's final defeat?",
          options: [
            "Battle of Trafalgar",
            "Battle of Waterloo",
            "Battle of Austerlitz",
            "Battle of Leipzig",
          ],
          answer: "Battle of Waterloo",
        },
        {
          no: 2,
          question:
            "Which Byzantine Emperor is famous for codifying Roman law?",
          options: ["Constantine I", "Justinian I", "Theodosius I", "Basil II"],
          answer: "Justinian I",
        },
        {
          no: 3,
          question:
            "Which Chinese dynasty oversaw the construction of the Forbidden City?",
          options: [
            "Tang Dynasty",
            "Song Dynasty",
            "Ming Dynasty",
            "Qing Dynasty",
          ],
          answer: "Ming Dynasty",
        },
        {
          no: 4,
          question:
            "What is the name of the 1917 event that led to the fall of the Russian monarchy?",
          options: [
            "The October Manifesto",
            "The Russian Revolution",
            "The Decembrist Revolt",
            "The Bloody Sunday Massacre",
          ],
          answer: "The Russian Revolution",
        },
        {
          no: 5,
          question: "Which 1648 peace agreement ended the Thirty Years' War?",
          options: [
            "Treaty of Utrecht",
            "Peace of Westphalia",
            "Congress of Vienna",
            "Treaty of Tordesillas",
          ],
          answer: "Peace of Westphalia",
        },
        {
          no: 6,
          question:
            "Who was the first Chancellor of the German Empire, unifying Germany in 1871?",
          options: [
            "Kaiser Wilhelm I",
            "Otto von Bismarck",
            "Konrad Adenauer",
            "Paul von Hindenburg",
          ],
          answer: "Otto von Bismarck",
        },
        {
          no: 7,
          question:
            "What was the name of the ancient trade route linking China to the Mediterranean?",
          options: [
            "The Amber Road",
            "The Silk Road",
            "The Incense Route",
            "The Spice Route",
          ],
          answer: "The Silk Road",
        },
        {
          no: 8,
          question:
            "Which ancient Greek city-state was renowned for its military discipline?",
          options: ["Athens", "Corinth", "Sparta", "Thebes"],
          answer: "Sparta",
        },
        {
          no: 9,
          question:
            "Who was the Aztec emperor at the time of the Spanish conquest led by Hernán Cortés?",
          options: ["Atahualpa", "Moctezuma II", "Cuauhtémoc", "Pachacuti"],
          answer: "Moctezuma II",
        },
        {
          no: 10,
          question:
            "Which 1494 treaty divided newly discovered lands between Spain and Portugal?",
          options: [
            "Treaty of Tordesillas",
            "Treaty of Zaragoza",
            "Treaty of Madrid",
            "Treaty of Alcáçovas",
          ],
          answer: "Treaty of Tordesillas",
        },
        {
          no: 11,
          question:
            "Which English king was forced to sign the Magna Carta in 1215?",
          options: [
            "King Richard I",
            "King John",
            "King Henry II",
            "King Edward I",
          ],
          answer: "King John",
        },
        {
          no: 12,
          question:
            "What was the code name for the failed 1944 plot to assassinate Adolf Hitler?",
          options: [
            "Operation Overlord",
            "Operation Valkyrie",
            "Operation Barbarossa",
            "Operation Market Garden",
          ],
          answer: "Operation Valkyrie",
        },
        {
          no: 13,
          question:
            "The 1453 fall of Constantinople marked the end of which empire?",
          options: [
            "The Roman Empire",
            "The Byzantine Empire",
            "The Ottoman Empire",
            "The Holy Roman Empire",
          ],
          answer: "The Byzantine Empire",
        },
        {
          no: 14,
          question:
            "Which queen of Egypt was famously allied with both Julius Caesar and Mark Antony?",
          options: ["Nefertiti", "Hatshepsut", "Cleopatra", "Ankhesenamun"],
          answer: "Cleopatra",
        },
        {
          no: 15,
          question:
            "What is the name of the severe global economic crisis of the 1930s?",
          options: [
            "The Long Depression",
            "The Panic of 1907",
            "The Great Depression",
            "The Gilded Age Crash",
          ],
          answer: "The Great Depression",
        },
      ],
    },
  },
];

/* ===================== How to use it ===================== */

// // 1. Question generation — pull questions for a chosen category + difficulty:
// function getQuestions(categoryName, difficulty) {
//   const category = questionBank.find((c) => c.category === categoryName);
//   return category ? category.levels[difficulty] : [];
// }
// // Example: getQuestions("Science", "medium") -> array of 15 question objects

// // 2. Answer verification — call this when the user clicks an option:
// function checkAnswer(questionObj, selectedOption) {
//   return selectedOption === questionObj.answer; // true = correct, false = wrong
// }
// // Example:
// // const q = getQuestions("Math", "easy")[0];
// // checkAnswer(q, "12"); // -> true

// export default questionBank;
// export { getQuestions, checkAnswer };

//=============== question bank ends ======//



const themeToggle = document.querySelector(".theme-toggle");
const body = document.querySelector("body");

const applyTheme = (isDark) => {
  body.classList.toggle("darkmode", isDark);
  themeToggle.setAttribute("aria-pressed", String(isDark));
};

// 1. Initial theme: saved choice wins, otherwise fall back to OS preference
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  applyTheme(true);
} else if (savedTheme === "light") {
  applyTheme(false);
} else {
  applyTheme(window.matchMedia("(prefers-color-scheme: dark)").matches);
}

// 2. Toggle on click and remember the choice
themeToggle.addEventListener("click", () => {
  const isDark = !body.classList.contains("darkmode");
  applyTheme(isDark);
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// 3. Follow the OS theme live, but only until the user picks one manually
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    if (!localStorage.getItem("theme")) {
      applyTheme(e.matches);
    }
  });

//----------------Home Page----------------------------------
/* ===================== Theme toggle ===================== */
/*
const themeToggle = document.querySelector('.theme-toggle');
const body = document.querySelector('body');

const applyTheme = (isDark) => {
  body.classList.toggle('darkmode', isDark);
  themeToggle.setAttribute('aria-pressed', String(isDark));
};

const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
  applyTheme(true);
} else if (savedTheme === 'light') {
  applyTheme(false);
} else {
  applyTheme(window.matchMedia('(prefers-color-scheme: dark)').matches);
}

themeToggle.addEventListener('click', () => {
  const isDark = !body.classList.contains('darkmode');
  applyTheme(isDark);
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (!localStorage.getItem('theme')) {
    applyTheme(e.matches);
  }
});
*/


/* ===================== Number of questions stepper ===================== */
const minusBtn = document.querySelector('.minus-icon');
const plusBtn = document.querySelector('.plus-icon');
const countDisplay = document.querySelector('.number-count');

const MIN_QUESTIONS = 5;
const MAX_QUESTIONS = 15;
const STEP = 5;

function updateQuestionCount(delta) {
  let value = parseInt(countDisplay.textContent, 10) || MIN_QUESTIONS;
  value = Math.min(MAX_QUESTIONS, Math.max(MIN_QUESTIONS, value + delta));
  countDisplay.textContent = value;
}

minusBtn.addEventListener('click', () => updateQuestionCount(-STEP));
plusBtn.addEventListener('click', () => updateQuestionCount(STEP));

/* ===================== Form submit ===================== */
const quizForm = document.querySelector('.quize-selection-form');
const playerNameInput = document.getElementById('player-name');
const categorySelect = document.getElementById('quiz-category');

quizForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const playerName = playerNameInput.value.trim();
  if (!playerName) {
    playerNameInput.focus();
    return;
  }

  // value = e.g. "science" (the option's value attribute)
  const category = categorySelect.value;
  // label = e.g. "Science & Nature" (the visible text)
  const categoryLabel = categorySelect.options[categorySelect.selectedIndex].text;

  // Difficulty is a radio group now, not a button group — read the checked one
  const difficultyChecked = document.querySelector('input[name="difficulty"]:checked');
  const difficulty = difficultyChecked ? difficultyChecked.value : null;

  const questionCount = parseInt(countDisplay.textContent, 10);

  console.log({
    playerName,
    category,
    categoryLabel,
    difficulty,
    questionCount
  });

  // Hook your actual quiz-generation logic here, e.g.:
  // startQuiz({ playerName, category, difficulty, questionCount });
});


