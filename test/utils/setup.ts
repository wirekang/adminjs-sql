import { execCmd } from './execCmd';

export default async function (): Promise<void> {
  console.log('');
  console.log('');
  console.log('Initializing databases...');
  await execCmd('docker compose -f ./test/docker-compose.yml up -d');
  await new Promise((r) => setTimeout(r, 20000));
}
