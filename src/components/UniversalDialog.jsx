import React from 'react';
import { X } from 'lucide-react';

const UniversalDialog = ({
  open = false,
  onClose,
  type = 'confirmation',
  title = '',
  message = '',
  children,
  onConfirm,
  onCancel,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  size = 'md',
}) => {
  if (!open) return null;

  const widthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-2xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        className={`bg-white rounded-xl shadow-lg w-full ${widthClasses[size]} p-6 relative max-h-[90vh] overflow-y-auto`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full z-10"
        >
          <X size={20} />
        </button>

        {/* Title */}
        {title && <h2 className="text-xl font-semibold mb-4 pr-8">{title}</h2>}

        {/* Content */}
        {type === 'confirmation' && (
          <p className="text-gray-700 mb-6">{message}</p>
        )}

        {type === 'message' && <p className="text-gray-700 mb-6">{message}</p>}

        {type === 'form' && <div>{children}</div>}

        {/* Actions for non-form types */}
        {type !== 'form' && (
          <div className="flex justify-end gap-3">
            {type === 'confirmation' && (
              <>
                <button
                  onClick={onCancel || onClose}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
                >
                  {cancelText}
                </button>
                <button
                  onClick={onConfirm}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  {confirmText}
                </button>
              </>
            )}

            {type === 'message' && (
              <button
                onClick={onClose}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                OK
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UniversalDialog;
