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
import { NewQuoteInput, Quote } from '@/types/quotes';
import { Spinner } from '@/components/ui/spinner';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import {NewQuoteSchema} from '@/app/actions/quoteActions';


export type NewQuoteFormState = {
  success: boolean;
  // Specify the type of errors based on your application's error handling
  errors?: any;
  data?: Partial<NewQuoteInput>;
};

const initialFormState: NewQuoteFormState = {
  success: false,
};

export default function NewQuotePage() {
  const [state, dispatchAction, isPending] = useActionState<
    NewQuoteFormState,
    FormData
  >(addQuote, initialFormState);

  const {
    register,
    formState: { errors: clientFormErrors, isValid: isFormValid },
  } = useForm<NewQuoteInput>({
    mode: 'onBlur',
    resolver: zodResolver(NewQuoteSchema)
  });

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

  console.log('Form errors', clientFormErrors);

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
                  type='text'
                  aria-describedby='author-error'
                  defaultValue={state?.data?.author || ''}
                  {...register('author', {
                    required: 'Author name is required',
                    maxLength: {
                      value: 50,
                      message: 'Author name should be max 50 characters long',
                    },
                    minLength: {
                      value: 2,
                      message: 'Author name should be min 2 characters long',
                    },
                  })}
                />

                {state.errors?.author && !clientFormErrors?.author && (
                  <FieldDescription id='author-error'>
                    {state.errors?.author?.join('; ')}
                  </FieldDescription>
                )}

                {clientFormErrors?.author && (
                  <FieldDescription id='author-error'>
                    {clientFormErrors?.author?.message}
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
                  defaultValue={state?.data?.quote || ''}
                  aria-describedby='quote-error'
                  {...register('quote', {
                    required: 'Quote is required',
                    maxLength: {
                      value: 300,
                      message: 'Quote should be max 300 characters long',
                    },
                    minLength: {
                      value: 2,
                      message: 'Quote should be min 2 characters long',
                    },
                  })}
                />

                {state.errors?.quote && !clientFormErrors?.quote && (
                  <FieldDescription id='quote-error'>
                    {state.errors?.quote?.join('; ')}
                  </FieldDescription>
                )}

                {clientFormErrors?.quote && (
                  <FieldDescription id='quote-error'>
                    {clientFormErrors?.quote?.message}
                  </FieldDescription>
                )}
              </Field>
            </FieldGroup>
          </FieldSet>
          <Field orientation='horizontal'>
            <Button type='submit' disabled={!isFormValid}>Save quote</Button>
            <Button variant='outline' type='reset'>
              Clear
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
