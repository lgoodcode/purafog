import { useState, useEffect } from 'preact/hooks'
import PulseSpinner from './PulseSpinner'
import type { Review } from '@/types/review'

type ReviewsProps = {
  initialReviews?: Review[]
}

export default function Reviews({ initialReviews }: ReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews || [])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getReviews = async () => {
      setLoading(true)

      try {
        const res = await fetch('/.netlify/functions/reviews').then((res) => res.json())

        if ('error_message' in res) {
          console.error(res)
        } else {
          setReviews((initialReviews) => res.concat(initialReviews))
        }
      } catch (err) {
        console.error(err)
      }

      setLoading(false)
    }

    getReviews()
  }, [])

  return loading ? (
    <div className="centered py-12 flex flex-col gap-4">
      <PulseSpinner />
      <span className="text-xl text-gray-700 capitalize">Retrieving reviews...</span>
    </div>
  ) : !reviews.length ? (
    <div className="text-center py-24">
      <h1 className="text-3xl text-gray-600 capitalize">No reviews found</h1>
    </div>
  ) : (
    <div
      className="max-h-screen pb-12 px-4 md:px-8 overflow-y-scroll"
      style={{
        boxShadow: '0px -5px 20px 0px #dadadab3, 0px 14px 20px 0px #dadadab3',
      }}
    >
      <div className="flex flex-col gap-6">
        <div></div>

        {reviews.map((review) => (
          <div
            key={review.author_url}
            className="review flex flex-col gap-4 px-8 py-6 bg-gray-100 rounded-md"
          >
            <div className="flex gap-4 items-center">
              <div>
                <img
                  src={review.profile_photo_url}
                  alt={review.author_name + ' profile photo url'}
                  referrerPolicy="no-referrer"
                  height="48"
                  width="48"
                />
              </div>
              <a href={review.author_url}>
                <span className="text-xl font-medium text-blue-500 capitalize">
                  {review.author_name}
                </span>
              </a>
            </div>

            <div className="stars flex gap-1">
              {Array.from({ length: Math.floor(review.rating) }).map(() => (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 576 512"
                  fill="rgb(240, 173, 78)"
                >
                  <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                </svg>
              ))}

              {review.rating % 1 !== 0 && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 576 512"
                  fill="rgb(240, 173, 78)"
                >
                  <path d="M288 376.4l.1-.1 26.4 14.1 85.2 45.5-16.5-97.6-4.8-28.7 20.7-20.5 70.1-69.3-96.1-14.2-29.3-4.3-12.9-26.6L288.1 86.9l-.1 .3V376.4zm175.1 98.3c2 12-3 24.2-12.9 31.3s-23 8-33.8 2.3L288.1 439.8 159.8 508.3C149 514 135.9 513.1 126 506s-14.9-19.3-12.9-31.3L137.8 329 33.6 225.9c-8.6-8.5-11.7-21.2-7.9-32.7s13.7-19.9 25.7-21.7L195 150.3 259.4 18c5.4-11 16.5-18 28.8-18s23.4 7 28.8 18l64.3 132.3 143.6 21.2c12 1.8 22 10.2 25.7 21.7s.7 24.2-7.9 32.7L438.5 329l24.6 145.7z" />
                </svg>
              )}
            </div>

            <div>
              <p>{review.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
