// ============================================================
// Xander Meyen - portfolio
// Alles in vanilla JS, geen libraries.
// ============================================================

// ---------- Typing effect in de hero ----------
const roles = [
    'software developer',
    'web developer',
    'escape room bouwer',
    'C# liefhebber',
    'professionele mensen-doen-schrikken-er'
];

const typedEl = document.getElementById('typedRole');
let roleIndex = 0;
let charIndex = roles[0].length;
let deleting = true;

function typeLoop() {
    const current = roles[roleIndex];

    if (deleting) {
        charIndex--;
        typedEl.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }
        setTimeout(typeLoop, 35);
    } else {
        charIndex++;
        typedEl.textContent = roles[roleIndex].slice(0, charIndex);
        if (charIndex === roles[roleIndex].length) {
            deleting = true;
            setTimeout(typeLoop, 2200);
            return;
        }
        setTimeout(typeLoop, 65);
    }
}
if (typedEl) setTimeout(typeLoop, 1800);

// ---------- Scroll reveal ----------
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// ---------- Skill bars vullen zodra ze in beeld komen ----------
const barObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.querySelectorAll('.skill-bar').forEach((bar, i) => {
            const level = bar.dataset.level || 50;
            setTimeout(() => {
                bar.querySelector('.bar-fill').style.width = level + '%';
            }, i * 120);
        });
        barObserver.unobserve(entry.target);
    });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-bars').forEach((el) => barObserver.observe(el));

// ---------- Mobiel menu ----------
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ---------- Back to top ----------
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    backToTop.classList.toggle('show', window.scrollY > 600);
}, { passive: true });

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ---------- Achievements ----------
const achievementEl = document.getElementById('achievement');
const achievementText = document.getElementById('achievementText');
const unlocked = new Set();
let achievementTimer = null;

function unlockAchievement(id, text) {
    if (unlocked.has(id)) return;
    unlocked.add(id);

    achievementText.textContent = text;
    achievementEl.classList.add('show');

    clearTimeout(achievementTimer);
    achievementTimer = setTimeout(() => achievementEl.classList.remove('show'), 4000);
}

// Achievements bij het bereiken van secties
const sectionAchievements = {
    'projecten': 'Recruiter modus geactiveerd: projecten bekeken',
    'ervaring': 'Git historicus: de hele log gelezen',
    'contact': 'Bijna vrienden: contactsectie bereikt'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        if (sectionAchievements[id]) {
            unlockAchievement('section-' + id, sectionAchievements[id]);
        }
        sectionObserver.unobserve(entry.target);
    });
}, { threshold: 0.4 });

Object.keys(sectionAchievements).forEach((id) => {
    const el = document.getElementById(id);
    if (el) sectionObserver.observe(el);
});

// ---------- Konami code: scare mode ----------
const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiPos = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konami[konamiPos]) {
        konamiPos++;
        if (konamiPos === konami.length) {
            konamiPos = 0;
            triggerScareMode();
        }
    } else {
        konamiPos = e.key === konami[0] ? 1 : 0;
    }
});

function triggerScareMode() {
    document.body.classList.add('scare-mode');
    unlockAchievement('konami', 'Konami code gevonden. De scare actor groet je.');
    setTimeout(() => document.body.classList.remove('scare-mode'), 1300);
}

// ---------- Mini terminal ----------
const terminalBody = document.getElementById('terminalBody');
const terminalInput = document.getElementById('terminalInput');
const terminal = document.getElementById('terminal');

terminal.addEventListener('click', () => terminalInput.focus());

const commands = {
    help: () =>
        'beschikbare commando\'s:\n' +
        '  help        deze lijst\n' +
        '  whoami      wie is xander\n' +
        '  projects    mijn projecten\n' +
        '  skills      waar ik mee werk\n' +
        '  cv          download mijn cv\n' +
        '  contact     stuur me een bericht\n' +
        '  boo         niet doen\n' +
        '  clear       maak het scherm leeg',

    whoami: () =>
        'Xander Meyen. Student Graduaat Programmeren @ Thomas More.\n' +
        'Bouwt escape rooms voor de lol.\n' +
        'In het weekend soms een monster in Bobbejaanland.',

    projects: () =>
        'bureau-x.be ............ online escape room (live)\n' +
        'clickshot vzw .......... website voor fotoclub (klantopdracht)\n' +
        'airsoft tracker ........ blazor webapp (in ontwikkeling)\n' +
        'tower defense .......... c++ game (afgerond)\n' +
        'scroll omhoog voor de details.',

    skills: () =>
        'C#, .NET, Blazor, JavaScript, TypeScript, HTML, CSS, SQL, C++\n' +
        'plus: Git, Docker, WordPress en koppig blijven debuggen.',

    cv: () => {
        const a = document.createElement('a');
        a.href = 'cv-xander-meyen.pdf';
        a.download = '';
        a.click();
        return 'cv-xander-meyen.pdf wordt gedownload…';
    },

    contact: () => {
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        return 'navigeren naar #contact…';
    },

    boo: () => {
        triggerScareMode();
        return 'JE BENT GEWAARSCHUWD.';
    },

    sudo: () => 'leuk geprobeerd. dit incident wordt gerapporteerd.',
    ls: () => 'projecten/  skills/  ervaring/  over-mij/  contact.txt  geheimen/ [permission denied]',
    pwd: () => '/home/xander/portfolio',
    exit: () => 'er is geen ontsnappen mogelijk. dit is een escape room.',

    clear: () => {
        terminalBody.innerHTML = '';
        return null;
    }
};

function termPrint(text, className) {
    if (text === null || text === undefined) return;
    const p = document.createElement('p');
    p.className = 'term-line' + (className ? ' ' + className : '');
    p.textContent = text;
    terminalBody.appendChild(p);
    terminalBody.scrollTop = terminalBody.scrollHeight;
}

terminalInput.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;

    const raw = terminalInput.value.trim();
    terminalInput.value = '';
    if (!raw) return;

    termPrint(raw, 'term-cmd');

    const cmd = raw.toLowerCase().split(' ')[0];
    if (commands[cmd]) {
        termPrint(commands[cmd](), 'term-ok');
        unlockAchievement('terminal', 'Terminal pro: je eerste commando uitgevoerd');
    } else {
        termPrint(`bash: ${cmd}: command not found (probeer 'help')`, 'term-err');
    }
});

// ---------- Contact form: simpele validatie ----------
const form = document.querySelector('.contact-form');
const formError = document.getElementById('formError');

if (form) {
    form.addEventListener('submit', (e) => {
        let valid = true;
        form.querySelectorAll('input[required], textarea[required]').forEach((field) => {
            const empty = !field.value.trim();
            const badEmail = field.type === 'email' && field.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value);
            const invalid = empty || badEmail;
            field.classList.toggle('invalid', invalid);
            if (invalid) {
                field.setAttribute('aria-invalid', 'true');
                field.setAttribute('aria-describedby', 'formError');
                valid = false;
            } else {
                field.removeAttribute('aria-invalid');
                field.removeAttribute('aria-describedby');
            }
        });
        formError.hidden = valid;
        if (!valid) e.preventDefault();
    });
}

// Na een geslaagde verzending stuurt formsubmit terug naar ?verzonden=1#contact
if (new URLSearchParams(window.location.search).has('verzonden')) {
    // De sectie-achievement van #contact zou deze toast meteen overschrijven
    unlocked.add('section-contact');
    setTimeout(() => unlockAchievement('form', 'Bericht verzonden. Ik antwoord zo snel mogelijk.'), 600);
    history.replaceState(null, '', window.location.pathname + window.location.hash);
}

// ---------- Kleine groet in de console, voor collega-devs ----------
console.log(
    '%c> hallo daar, mede-dev 👋\n> leuk dat je even komt kijken. de code staat op github.com/xandermeyen',
    'color:#4ade80;font-family:monospace;font-size:13px;'
);
