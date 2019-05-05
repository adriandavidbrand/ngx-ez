import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

export class EzTestHelper<T> {
  constructor(private fixture: ComponentFixture<T>) { }

  async control(name: string): Promise<any> {
    this.fixture.detectChanges();
    await this.fixture.whenStable();
    const element = this.fixture.debugElement.query(By.css(`[name=${name}]`));
    return element ? element.context : undefined;
  }
}
