document.getElementById('suggestionForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const suggestion = document.getElementById('suggestion').value;
    const ipAddress = await getUserIp();

    // Check if the IP is banned
    if (await isBanned(ipAddress)) {
        alert("You are banned from submitting suggestions.");
        return;
    }

    // Sending suggestion to Discord webhook
    const webhookUrl = 'YOUR_DISCORD_WEBHOOK_URL';
    fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            content: `Username: ${username}\nSuggestion: ${suggestion}`
        })
    }).then(response => {
        if (response.ok) {
            alert('Suggestion submitted successfully!');
        } else {
            alert('Error submitting suggestion. Please try again.');
        }
    }).catch(error => {
        console.error('Error:', error);
        alert('An error occurred.');
    });
});

async function getUserIp() {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
}

async function isBanned(ip) {
    const response = await fetch('https://raw.githubusercontent.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME/main/banned-ips.json');
    const bannedIps = await response.json();
    return bannedIps.includes(ip);
}
