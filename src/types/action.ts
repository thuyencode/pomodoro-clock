export type Action =
  | {
      type: 'increase_break_length'
    }
  | {
      type: 'decrease_break_length'
    }
  | {
      type: 'increase_session_length'
    }
  | {
      type: 'decrease_session_length'
    }
  | {
      type: 'decrease_session_length'
    }
  | {
      type: 'pause_resume'
    }
  | {
      type: 'reset'
    }
  | {
      type: 'on_session'
    }
  | {
      type: 'countdown'
    }
