function createProjectCard(repo) {
    const card = document.createElement('article');
    card.className = 'project-card';

    const logo = document.createElement('div');
    logo.className = 'project-logo';
    logo.style.setProperty('--logo-hue', String(computeLogoHue(repo.name)));

    const logoText = document.createElement('span');
    logoText.className = 'logo-text';
    logoText.textContent = getLogoText(repo.name);
    logo.appendChild(logoText);

    const title = document.createElement('h2');
    title.className = 'project-title';
    title.textContent = formatRepositoryTitle(repo.name);

    const meta = document.createElement('div');
    meta.className = 'project-meta';
    meta.appendChild(createMetaBadge(repo.visibility));
    meta.appendChild(createMetaBadge(repo.language));

    const description = document.createElement('p');
    description.className = 'project-description';
    description.textContent = getRepositoryDescription(repo);

    const buttonGroup = document.createElement('div');
    buttonGroup.className = 'button-group';
    buttonGroup.appendChild(createActionButton('GitHub Repo', repo.url));

    if (liveDemoLinks[repo.name]) {
        buttonGroup.appendChild(createActionButton('Live Demo', liveDemoLinks[repo.name]));
    }

    card.appendChild(logo);
    card.appendChild(title);
    card.appendChild(meta);
    card.appendChild(description);
    card.appendChild(buttonGroup);

    return card;
}

function renderProjects() {
    const uniqueRepositories = deduplicateRepositories(repositories);
    const duplicateCount = repositories.length - uniqueRepositories.length;

    projectsSummary.textContent = `${uniqueRepositories.length} repositories listed (${duplicateCount} duplicates removed).`;

    uniqueRepositories.forEach((repo) => {
        projectsContainer.appendChild(createProjectCard(repo));
    });
}

