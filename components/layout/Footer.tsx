export default function Footer() {
  return (
    <footer className="block py-4">
      <div className="container mx-auto px-4">
        <hr className="mb-4 border-b-1 border-gray-200" />
        <div className="flex flex-wrap items-center  justify-between justify-center">
          <div className="text-sm text-gray-500 font-semibold py-1    ">
            جميع الحقوق محفوظة © {new Date().getFullYear()}
            هيئة تطوير التعليم
          </div>

          <ul className="flex flex-wrap list-none md:justify-end  justify-center">
            <li>
              <a
                href="mailto:info@edcommission.com"
                className="text-gray-600 hover:text-gray-800 text-sm font-semibold py-1 px-3"
              >
                info@edcommission.com
              </a>
            </li>
            <li>
              <a
                href="https://edcommission.com/"
                target="_blank"
                className="text-gray-600 hover:text-gray-800 text-sm font-semibold py-1 px-3"
              >
                EDC
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
