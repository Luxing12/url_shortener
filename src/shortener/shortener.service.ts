import { Injectable, NotFoundException } from '@nestjs/common';
import { nanoid } from 'nanoid';

type Record = {
    id: string;
    url: string;
    createdAt: number;
    accessCount: number
};

@Injectable()
export class ShortenerService {
  private store = new Map<string, Record>();

  create(url: string) {
    const id = nanoid(7);
    const rec: Record = { id, url, createdAt: Date.now(), accessCount: 0 };
    this.store.set(id, rec);
    return rec;
  }

  get(id: string) {
    const rec = this.store.get(id);
    if (!rec) throw new NotFoundException('Not found');
    rec.accessCount++;

    return rec;
  }

  list() {
    return Array.from(this.store.values());
  }

  delete(id: string) {
    return this.store.delete(id);
  }

  update(id: string, url: string) {
    const rec = this.store.get(id);
    if (!rec) throw new NotFoundException('Not found');
    rec.url = url;
    return rec;
  }
}
