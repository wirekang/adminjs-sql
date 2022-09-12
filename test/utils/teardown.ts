import { execCmd } from './execCmd';

export default function (): Promise<void> {
  console.log('');
  console.log('');
  console.log('Terminating databases...');
  return execCmd('docker compose -f ./test/docker-compose.yml down');
}
