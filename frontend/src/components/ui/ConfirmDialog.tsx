import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";

type ConfirmDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
};

export function ConfirmDialog({
  open,
  onOpenChange,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 " />
        <Dialog.Content className="fixed z-50 top-[50%] left-[50%] w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-6 shadow-lg focus:outline-none">
          <Dialog.Title className="text-lg font-semibold">{title}</Dialog.Title>
          <Dialog.Description className="mt-2 text-sm text-gray-600">
            {description}
          </Dialog.Description>
          <div className="mt-6 flex justify-end space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              {cancelText}
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                onConfirm();
                onOpenChange(false);
              }}
            >
              {confirmText}
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
