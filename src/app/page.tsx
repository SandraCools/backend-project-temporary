import {Button} from '@/components/ui/button'
import {Card, CardContent} from '@/components/ui/card'
import Link from 'next/link'
import {FunctionComponent} from 'react'

const Home: FunctionComponent = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between py-16">
      <section>
        <div className="px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Manage Your Contacts, Easily & Securely</h2>
          <p className="text-xl mb-6">The ultimate app to organize, track, and manage your contacts seamlessly.</p>
          <Link href="/login">
            <Button size="lg">Get Started for Free</Button>
          </Link>
        </div>
      </section>

      <section id="features" className="py-14">
        <div className="px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-2">
                <h3 className="font-bold text-lg">Organize Effortlessly</h3>
                <p>Tag, filter, and sort your contacts with ease.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-2">
                <h3 className="font-bold text-lg">Secure Storage</h3>
                <p>Your contact data is encrypted and secure.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-14">
        <div className="px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-2">
                <p className="italic">"Contacts has transformed the way I handle my clients’ information."</p>
                <p className="mt-4 font-bold">- Alex Johnson, Freelancer</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-2">
                <p className="italic">"The smart reminders have saved me so much time and helped me stay organized!"</p>
                <p className="mt-4 font-bold">- Sarah Lee, Small Business Owner</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section>
        <div className="px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8">Sign up today and start managing your contacts like a pro.</p>
          <Link href="/login">
            <Button size="lg">Create Your Free Account</Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
