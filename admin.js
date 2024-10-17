document.getElementById('adminLoginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const adminUsername = document.getElementById('adminUsername').value;
    const adminPassword = document.getElementById('adminPassword').value;

    if (adminUsername === '012' && adminPassword === 'ewaf') {
        document.getElementById('adminPanel').style.display = 'block';
    } else {
        alert('Incorrect admin credentials');
    }
});

document.getElementById('refreshBannedIps').addEventListener('click', async function() {
    const bannedIpsList = document.getElementById('bannedIpsList');
    const response = await fetch('https://raw.githubusercontent.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME/main/banned-ips.json');
    const bannedIps = await response.json();

    bannedIpsList.innerHTML = '<ul>' + bannedIps.map(ip => `<li>${ip}</li>`).join('') + '</ul>';
});

async function banIp(ip) {
    const response = await fetch('https://api.github.com/repos/ysmuu/pangea/contents/banned-ips.json', {
        method: 'PUT',
        headers: {
            'Authorization': 'token YOUR_GITHUB_ACCESS_TOKEN',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: 'Ban IP',
            content: btoa(JSON.stringify([...currentBannedIps, ip]))
        })
    });

    if (response.ok) {
        alert('IP banned successfully!');
    } else {
        alert('Error banning IP. Please try again.');
    }
}
