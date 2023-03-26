import { SimplePool } from 'nostr-tools'
const { parse } = JSON;

const relays = [
    'wss://eden.nostr.land',
    'wss://nostr.fmt.wiz.biz',
    'wss://relay.damus.io',
    'wss://nostr-pub.wellorder.net',
    'wss://relay.nostr.info',
    'wss://offchain.pub',
    'wss://nos.lol',
    'wss://brb.io',
    'wss://relay.snort.social',
    'wss://relay.current.fyi',
    //  'wss://nostr.relayer.se',
]

export const getNIP05 = async (pubkey, pool, relays) => {
    // console.log('nip05')
    const event0 = await pool.get(relays, { kinds: [0], authors: [pubkey] });
    // console.log('event0', event0)

    const meta = parse(event0?.content)
    console.log(meta)
    if (meta?.nip05) {
        console.log(meta.nip05)
        return meta?.nip05
    }
}

export function NIC() {
    const pool = new SimplePool()
    return {
        pool,
        relays,
    }
}