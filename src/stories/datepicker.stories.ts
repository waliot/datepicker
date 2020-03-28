import { DatepickerComponent } from '../app/datepicker/components/datepicker/datepicker.component'
import { moduleMetadata, storiesOf } from '@storybook/angular'
import { DatepickerModule } from '../app/datepicker/datepicker.module'
import { action } from '@storybook/addon-actions'
import { themes } from '@storybook/theming'
import { DatepickerController } from '../app/datepicker/models'

storiesOf('Datepicker', module)
  .addDecorator(
    moduleMetadata({
      imports: [ DatepickerModule ]
    })
  )
  .add('Datepicker', () => {


    return {
      component: DatepickerComponent,
      props: {
        controller: new DatepickerController({
          displayMonth: 2
        }),
        dateSelect: action('Date select')
      }
    }
  })
  .addParameters({
    options: {
      theme: themes.dark
    }
  })
