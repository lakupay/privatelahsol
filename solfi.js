const fetch = require('node-fetch');
const fs = require('fs');
const chalk = require('chalk');
const randomUseragent = require('random-useragent');
const readLineSync = require('readline-sync');

function checkingAddress(address, uagent) {
    const index = fetch('https://solfi.pro/index/index/post.html', {
            method: 'POST',
            headers: {
                'Host': 'solfi.pro',
                'User-Agent': uagent,
                'Accept': '*/*',
                'Accept-Language': 'id,en-US;q=0.7,en;q=0.3',
                'Accept-Encoding': 'gzip, deflate, br',
                'Referer': 'https://solfi.pro/?btwaf=87008770',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Length': '26',
                'Origin': 'https://solfi.pro/?btwaf=87008770',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'same-origin',
                'Priority': 'u=0',
                'Te': 'trailers'
            },
            body: new URLSearchParams({
                'sharecode': '',
                'address': address
            })
        })

        .then(async (res) => {
            const data = await res.json();
            return data;
        });
    return index;
}

function checkingAddressWithReff(address, uagent, reff) {
    const index = fetch('https://solfi.pro/index/index/post.html', {
            method: 'POST',
            headers: {
                'Host': 'solfi.pro',
                'User-Agent': uagent,
                'Accept': '*/*',
                'Accept-Language': 'id,en-US;q=0.7,en;q=0.3',
                'Accept-Encoding': 'gzip, deflate, br',
                'Referer': 'https://solfi.pro/?btwaf=87008770',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Length': '26',
                'Origin': 'https://solfi.pro/?btwaf=87008770',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'same-origin',
                'Priority': 'u=0',
                'Te': 'trailers'
            },
            body: new URLSearchParams({
                'sharecode': reff,
                'address': address
            })
        })

        .then(async (res) => {
            const data = await res.json();
            return data;
        });
    return index;
}

(async () => {
    console.log(`Solfi Bot`);
    console.log(`1.) Claim Address [ Not Refferal ]`)
    console.log(`2.) Claim Address [ Refferal ]`)
    console.log()

    const vote = readLineSync.question(`Choose: `);
    const read2 = fs.readFileSync('listAddress.txt', 'UTF-8');
    const list2 = read2.split(/\r?\n/);

    if (vote == 2) {
        var reff = readLineSync.question(`Refferal Code: `);
    }
    for (var i = 0; i < list2.length; i++) {
        var address = list2[i].split('|')[0];

        const uagent = getFilteredUserAgent();
        console.log(chalk.redBright(`Using User-Agent: ${uagent}`));
        if (vote == 1) {
            const checkAddress = await checkingAddress(address, uagent);
            if (checkAddress.success == true) {
                console.log(
                    chalk.greenBright(`✅ Successfully checked address: ${address}`)
                );
                console.log(
                    chalk.blueBright(`📍 Address: ${address} is valid`)
                );
            } else {
                console.log(
                    chalk.redBright(`❌ Failed to check address: ${checkAddress.enmsg}`)
                );
                console.log(
                    chalk.yellowBright(`⚠️ Address: ${address} is invalid`)
                );
            }
        } else if (vote == 2) {
            const checkAddress = await checkingAddressWithReff(address, uagent, reff);
            if (checkAddress.success == true) {
                console.log(
                    chalk.greenBright(`✅ Successfully checked address: ${address} With Refferal Code: ${reff}`)
                );
                console.log(
                    chalk.blueBright(`📍 Address: ${address} is valid`)
                );
            } else {
                console.log(
                    chalk.redBright(`❌ Failed to check address: ${checkAddress.enmsg}`)
                );
                console.log(
                    chalk.yellowBright(`⚠️ Address: ${address} is invalid`)
                );
            }
        }
        console.log()
    }
})();

function getFilteredUserAgent() {
    return randomUseragent.getRandom((ua) => {
        return (
            ua.browserName === 'Firefox' || // Mozilla
            ua.browserName === 'Safari' || // Safari
            ua.browserName === 'Chrome' // Chrome
        );
    });
}
