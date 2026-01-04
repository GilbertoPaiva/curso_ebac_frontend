const GITHUB_USER = 'GilbertoPaiva';
const API_URL = `https://api.github.com/users/${GITHUB_USER}`;

const elements = {
    avatar: document.querySelector('[data-profile-avatar]'),
    name: document.querySelector('[data-profile-name]'),
    username: document.querySelector('[data-profile-username]'),
    repos: document.querySelector('[data-profile-repos]'),
    followers: document.querySelector('[data-profile-followers]'),
    following: document.querySelector('[data-profile-following]'),
    bio: document.querySelector('[data-profile-bio]'),
    link: document.querySelector('[data-profile-link]'),
    status: document.querySelector('[data-status-message]')
};

const setText = (element, value, fallback = '—') => {
    if (!element) return;
    element.textContent = value ?? fallback;
};

const setLink = (element, href) => {
    if (!element) return;
    if (href) {
        element.href = href;
        element.removeAttribute('aria-disabled');
    } else {
        element.href = '#';
        element.setAttribute('aria-disabled', 'true');
    }
};

const setAvatar = (element, url, name) => {
    if (!element) return;
    element.src = url || 'https://via.placeholder.com/180x180';
    element.alt = name ? `Avatar de ${name}` : 'Avatar do perfil';
};

const setStatus = (message, isError = false) => {
    if (!elements.status) return;
    elements.status.textContent = message;
    elements.status.style.color = isError ? '#b00020' : '#000';
};

const loadProfile = async () => {
    setStatus('Carregando perfil...');

    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`Erro ao buscar perfil (${response.status})`);
        }

        const data = await response.json();
        const displayName = data.name || data.login;

        setAvatar(elements.avatar, data.avatar_url, displayName);
        setText(elements.name, displayName);
        setText(elements.username, `@${data.login}`);
        setText(elements.repos, data.public_repos ?? 0);
        setText(elements.followers, data.followers ?? 0);
        setText(elements.following, data.following ?? 0);
        setText(elements.bio, data.bio || '');
        setLink(elements.link, data.html_url);

        setStatus('');
    } catch (error) {
        console.error('Erro ao carregar perfil', error);
        setStatus('Não foi possível carregar o perfil agora.', true);
    }
};

document.addEventListener('DOMContentLoaded', loadProfile);
