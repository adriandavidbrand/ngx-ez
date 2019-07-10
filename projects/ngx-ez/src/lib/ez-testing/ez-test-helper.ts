import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { EzControlBase } from '../ez-forms/components/ez-control-base';

export class EzTestHelper<T> {
  constructor(private fixture: ComponentFixture<T>) {}

  async control(name: string): Promise<EzControlBase> {
    this.fixture.detectChanges();
    await this.fixture.whenStable();
    const element = this.fixture.debugElement.query(By.css(`[name=${name}]`));
    return element ? element.context : undefined;
  }
}
