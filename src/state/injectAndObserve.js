
import { inject, observer } from 'mobx-preact'

export function injectAndObserve(injector, component) {
  return inject(injector)(observer(component))
}
