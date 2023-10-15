import React from "react";
import icon from "../Image/javascript.png";

export default function Footer() {
  return (
    <div>
      <footer class="bg-white rounded-lg shadow dark:bg-gray-900 m-4">
        <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div class="sm:flex sm:items-center sm:justify-between">
            <a
              href="https://github.com/thinkswell/javascript-mini-projects"
              class="flex items-center mb-4 sm:mb-0"
            >
              <img src={icon} class="h-8 mr-3" alt="hacker Logo" />
              <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Javascript Mini-Projects
              </span>
            </a>
            <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
              <li>
                <a href="#" class="mr-4 hover:underline md:mr-6 ">
                  About
                </a>
              </li>
              <li>
                <a href="#" class="mr-4 hover:underline md:mr-6">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" class="mr-4 hover:underline md:mr-6 ">
                  Licensing
                </a>
              </li>
              <li>
                <a href="#" class="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2023
            <a
              href="https://github.com/avinashkranjan/Pentesting-and-Hacking-Scripts"
              class="hover:underline"
            >
              Pentesting-and-Hacking-Scripts™
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}
