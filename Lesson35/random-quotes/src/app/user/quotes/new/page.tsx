'use client';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useActionState } from 'react';
import { addQuote } from '@/app/actions/quoteActions';
import { Quote } from '@/types/quotes';
import { Spinner } from '@/components/ui/spinner';

export type NewQuoteFormState = {
  success: boolean;
  // Specify the type of errors based on your application's error handling
  errors?: any;
  data?: Partial<Quote>;
};

const initialFormState: NewQuoteFormState = {
  success: false,
};

export default function NewQuotePage() {
  const [state, dispatchAction, isPending] = useActionState<
    NewQuoteFormState,
    FormData
  >(addQuote, initialFormState);

  if (isPending) {
    return (
      <div className='max-w-2xl mx-auto py-10 px-4'>
        <span>
          <Spinner data-icon='inline-start' /> Saving quote...
        </span>
      </div>
    );
  }

  if (state.success) {
    return (
      <div className='max-w-2xl mx-auto py-10 px-4'>
        <h1 className='text-2xl font-bold mb-4'>Quote added successfully!</h1>
      </div>
    );
  }

  console.log('state', state);

  return (
    <div className='max-w-2xl mx-auto py-10 px-4'>
      <form action={dispatchAction}>
        <FieldGroup>
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor='author-input'>Author</FieldLabel>
                <Input
                  id='author-input'
                  placeholder='Evil Rabbit'
                  required
                  type='text'
                  name='author'
                  maxLength={50}
                  aria-describedby='author-error'
                />

                {state.errors?.author && (
                  <FieldDescription id='author-error'>
                    {state.errors?.author?.join('; ')}
                  </FieldDescription>
                )}
              </Field>
            </FieldGroup>
          </FieldSet>
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor='quote-textarea'>Quote</FieldLabel>
                <Textarea
                  id='quote-textarea'
                  placeholder='Add any quote you like'
                  className='resize-none'
                  maxLength={300}
                  name='quote'
                  required
                />
              </Field>
            </FieldGroup>
          </FieldSet>
          <Field orientation='horizontal'>
            <Button type='submit'>Save quote</Button>
            <Button variant='outline' type='reset'>
              Clear
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
