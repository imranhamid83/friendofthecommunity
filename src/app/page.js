import Link from "next/link";
import Image from "next/image";
import ourStoryPic from "/public/images/home-image-1.jpg";
import styles from "./rootStyle.module.css";

export default function Page() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[70vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src={ourStoryPic}
            alt="Community gathering"
            placeholder="blur"
            quality={100}
            sizes="100vw"
            fill
            style={{
              objectFit: "cover",
            }}
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to Friends of the Community
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Building stronger communities through connection and collaboration
          </p>
          <Link
            href="/AboutUs"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
          >
            Learn More
          </Link>
        </div>
      </div>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Mission</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We bring people together to create wonderful communities through meaningful
              connections, shared experiences, and collaborative initiatives that make
              a lasting positive impact.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold mb-4">Community Events</h3>
              <p className="text-gray-600">
                Regular gatherings and events that bring neighbors together and
                strengthen community bonds.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold mb-4">Join us</h3>
              <p className="text-gray-600">
                Make a difference in your community through our organized volunteer
                initiatives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-white mb-8">
            Join our community and be part of the positive change.
          </p>
          <Link
            href="/ContactUs"
            className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition duration-300 inline-block"
          >
            Get Involved
          </Link>
        </div>
      </section>
    </div>
  );
}
