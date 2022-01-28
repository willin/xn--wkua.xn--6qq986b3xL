import { Domains } from '@prisma/client';
import { CfAPIToken, CfZoneId } from '../config';

const BASE_URL = 'https://api.cloudflare.com/client/v4';

export type CFResult = {
  success: boolean;
  result: {
    id: string;
  };
};

const headers = {
  Authorization: `Bearer ${CfAPIToken}`,
  'Content-Type': 'application/json'
};

export const createDomain = async (
  form: Pick<Domains, 'name' | 'content' | 'type' | 'proxied'>
): Promise<string> => {
  const res = await fetch(`${BASE_URL}/zones/${CfZoneId}/dns_records`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ ...form, ttl: 1 })
  });
  const data = (await res.json()) as CFResult;
  if (data.success) {
    return data.result.id;
  }
  return '';
};

export const updateDomain = async (
  id: string,
  form: Pick<Domains, 'name' | 'content' | 'type' | 'proxied'>
): Promise<boolean> => {
  const res = await fetch(`${BASE_URL}/zones/${CfZoneId}/dns_records/${id}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ ...form, ttl: 1 })
  });
  const data = (await res.json()) as CFResult;
  console.error(data);
  return data.success;
};

export const deleteDomain = async (id: string): Promise<boolean> => {
  const res = await fetch(`${BASE_URL}/zones/${CfZoneId}/dns_records/${id}`, {
    method: 'DELETE',
    headers
  });
  const data = (await res.json()) as CFResult;
  return !!data.result.id;
};
