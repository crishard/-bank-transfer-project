import React from 'react';

interface OptionLinkProps {
  option: string;
  hrefProp: boolean;
}

export function OptionLink(props: OptionLinkProps) {
  const redirect = '/';

  return (
    <p className="mt-2 text-center text-sm text-gray-600">
      Ou{' '}
      {props.hrefProp ? (
        <a href="/login" className="link-header text-indigo-600 hover:text-indigo-500">
          realize {props.option}!
        </a>
      ) : (
        <a href={redirect} className="link-header text-indigo-600 hover:text-indigo-400">
          realize {props.option}!
        </a>
      )}
    </p>
  );
}
