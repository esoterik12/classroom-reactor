'use client'
import SelectIcon from '../icons/SelectIcon'
import { Fragment, ReactNode } from 'react'
import { Dialog, Transition } from '@headlessui/react'

interface ModalProps {
  title: string
  isOpen: boolean
  closeModal: () => void
  children: ReactNode
}

const Modal = ({ title, isOpen, closeModal, children }: ModalProps) => {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-20' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='bg-gray-500 fixed inset-0 bg-opacity-25'></div>
          </Transition.Child>
          <div className='fixed inset-0 overflow-y-auto '>
            <div className='flex min-h-full items-center justify-center p-4 text-center '>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='relative mt-24 bg-offWhite-100 dark:bg-jet-700 bg-opacity-100 flex max-h-[90vh] w-full max-w-2xl transform flex-col overflow-y-auto rounded-2xl p-6 text-left shadow-xl transition-all'>
                  <div className='flex justify-between'>
                    <p className='ml-3 font-bold'>{title}</p>
                    <button onClick={() => closeModal()}>
                      <SelectIcon
                        iconClasses='h-6 w-6 hover:text-gray-400 transition-color transition transition-300'
                        iconSelection='x'
                      />
                    </button>
                  </div>
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default Modal
