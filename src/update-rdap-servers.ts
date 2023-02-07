import axios from "axios";
import fs from "fs";
import { DNSList } from "./types";

(async () => {
    const { data }: { data: DNSList } = await axios('https://data.iana.org/rdap/dns.json');
    if (data && data.services) {
        fs.writeFileSync('./src/rdap-servers.json', JSON.stringify(data.services));
        console.log(`'rdap-servers.json' file updated successfully`);
    } else {
        console.error(`TLD list update: There was an error saving the TLD file.`);
    }
    process.exit();
})();
