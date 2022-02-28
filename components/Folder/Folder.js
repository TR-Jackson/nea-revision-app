import 'chart.js/auto'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { FolderOpenIcon, BookOpenIcon } from '@heroicons/react/outline'
import { Bar } from 'react-chartjs-2'

import ExpandChevron from '../UI/ExpandChevron/ExpandChevron'

export default function Folder ({ name, description, revisedStatus, openFolderHandler, toRevise }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className='relative flex justify-center'>
      <div
        className={`${toRevise && 'border-2 border-sky-800'} w-full m-1 bg-sky-400 p-2  shadow-md rounded-md mb-0 hover:bg-sky-300 h-auto py-4 px-3`}
      >
        <div className='flex'>
          <div className='ml-1'>
            <FolderOpenIcon
              className='h-7 w-7  mr-2  cursor-pointer hover:text-gray-50'
              onClick={() => openFolderHandler(name)
              }
            />
            <BookOpenIcon
              className='h-7 w-7  mr-2 cursor-pointer hover:text-gray-50'
              onClick={() =>
                openFolderHandler(name, true)
              }
            />
          </div>
          <div className='flex flex-col truncate text-left mx-1 w-auto'>
            <p className='font-semibold truncate text-xl grow-0'>{name}</p>
            <p className='text-lg truncate grow'>{description}</p>
          </div>
          <div className='flex-grow flex flex-row-reverse my-auto space-x-4 pr-6 shrink-0'>
            <div className='w-auto'>
              {isExpanded && (
                <>
                  <div className='font-semibold'>Number of correct days of repetition</div>
                  <Bar
                    data={{
                      labels: ['Unrevised', '0', '1', '2 to 3', '4 to 8', '8+'],
                      datasets: [
                        {
                          label: 'Number of flashcards',
                          data: revisedStatus,
                          backgroundColor: [
                            '#ededed',
                            '#c40000',
                            '#c45200',
                            '#edd100',
                            '#7fba00',
                            '#00ba06'
                          ],
                          hoverOffset: 10,
                          borderWidth: 0
                        }
                      ]
                    }} options={{
                      plugins: {
                        legend: {
                          display: false
                        }
                      },
                      scales: {
                        yAxes: {
                          display: false
                        }
                      }
                    }}/>
                </>
              )}
            </div>
          </div>
          <div className=' flex flex-row-reverse'>
            <div className='h-6 w-6'>
              <ExpandChevron
                expanded={isExpanded} onToggle={() => setIsExpanded(!isExpanded)}
              />
            </div>
          </div>
        </div>
      </div>
      {toRevise && <div className='w-auto justify-end flex'>
        <div className='h-3 w-3 rounded-full bg-sky-800 absolute'></div>
        <div className='h-3 w-3 rounded-full bg-sky-800 absolute animate-ping inline-flex'></div>
      </div>}
    </div>
  )
}

Folder.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  revisedStatus: PropTypes.arrayOf(PropTypes.number),
  openFolderHandler: PropTypes.func,
  toRevise: PropTypes.bool
}
